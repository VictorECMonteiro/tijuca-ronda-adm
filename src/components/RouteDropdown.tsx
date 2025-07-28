import { useEffect, useState } from "react";
import dragdrop from "../assets/img/dragdrop.png";
import styles from "../styles/components/RouteDropdown.module.css";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { fetchLocaisByRota, updateLocaisDaRota } from "../api/rotaApi";

type Local = {
  idLocal: number;
  nomeLocal: string;
  horario: string;
  id: number;
};

type RouteDropdownProps = {
  idRota: number;
};

const RouteDropdown = ({ idRota }: RouteDropdownProps) => {
  const [locais, setLocais] = useState<Local[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLocais = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchLocaisByRota(idRota);
        setLocais(data);
      } catch {
        setError("Erro ao carregar locais");
        setLocais([]);
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
    // Remove o item movido da posição original
    const [movedItem] = updated.splice(source.index, 1);
    // Insere o item na nova posição
    updated.splice(destination.index, 0, movedItem);
  
    
    const updatedWithNewIds = updated.map((local, index) => ({
      ...local,
      id: index + 1,
    }));
  
    // Ordena visualmente pela hora (do menor para o maior)
    const sortedByHorario = updatedWithNewIds.sort((a, b) => {
      const [h1, m1] = a.horario.split(":").map(Number);
      const [h2, m2] = b.horario.split(":").map(Number);
      return h1 !== h2 ? h1 - h2 : m1 - m2;
    });
  
    setLocais(sortedByHorario);
    console.log("Locais atualizados e ordenados:", sortedByHorario);
  };
  
  const aplicarMudancas = async () => {
    
    const payload = locais.map(({ idLocal, id }) => ({
      idLocal,
      id,
    }));
  
    const success = await updateLocaisDaRota(idRota, payload);
    if (success) {
      alert("Mudanças aplicadas com sucesso!");
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
                    key={local.idLocal}
                    draggableId={String(local.idLocal)}
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
