import { useEffect, useState } from "react";
import dragdrop from "../assets/img/dragdrop.png";
import styles from "../styles/components/RouteDropdown.module.css";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { fetchLocaisByRota, changeLocalOrder } from "../api/rotaApi";

type Local = {
  idLocal: number;
  nomeLocal: string;
  horario: string;
  id: number; // mantido para garantir identificador único
};

type RouteDropdownProps = {
  idRota: number;
};

const RouteDropdown = ({ idRota }: RouteDropdownProps) => {
  const [locais, setLocais] = useState<Local[]>([]);
  const [listaAnterior, setListaAnterior] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLocais = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchLocaisByRota(idRota);
        setLocais(data);
        setListaAnterior(data.map(local => local.id));
      } catch {
        setError("Erro ao carregar locais");
        setLocais([]);
        setListaAnterior([]);
      } finally {
        setLoading(false);
      }
    };
    if (idRota) loadLocais();
  }, [idRota]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;
  
    const updated = Array.from(locais);
    const [movedItem] = updated.splice(source.index, 1);
    updated.splice(destination.index, 0, movedItem);
  
    const horarios = locais.map(local => local.horario);
    const reordered = updated.map((local, index) => ({
      ...local,
      horario: horarios[index], 
    }));
  
    setLocais(reordered);
  };
  

  const aplicarMudancas = async () => {
    const payload = {
      idRota,
      listaAnterior,
      listaAtual: locais.map(local => local.id),
    };

    const success = await changeLocalOrder(payload);

    if (success) {
      alert("Mudanças aplicadas com sucesso!");
      setListaAnterior(locais.map(local => local.id));
    } else {
      alert("Erro ao aplicar mudanças.");
    }
  };

  return (
    <div className={styles.dropdown}>
      {loading ? (
        <p>Carregando locais...</p>
      ) : error ? (
        <p>{error}</p>
      ) : locais.length === 0 ? (
        <p>Nenhum local encontrado</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="locais-list">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.locaisContainer}
              >
                {locais.map((local, index) => (
                  <Draggable
                    key={`${local.idLocal}-${local.id}`} 
                    draggableId={`${local.idLocal}-${local.id}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={`${styles.localItem} ${snapshot.isDragging ? styles.dragging : ""}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className={styles.localInfo}>
                          <span className={styles.localName}>{local.nomeLocal}</span>
                          <span className={styles.localHorario}>{local.horario}</span>
                        </div>
                        <div className={styles.dragHandle}>
                          <img src={dragdrop} alt="Arrastar" className={styles.dragIcon} />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {locais.length > 0 && (
        <div className={styles.buttonWrapper}>
          <button className={styles.applyButton} onClick={aplicarMudancas}>
            Aplicar mudanças
          </button>
        </div>
      )}
    </div>
  );
};

export default RouteDropdown;
