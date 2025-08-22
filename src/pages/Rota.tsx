import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { ManagePage } from "../components/table/ManagePage";
import CreateRouteModal from "../components/modals/CreateRouteModal";
import styles from "../styles/pages/Logs.module.css";
import RouteDropdown from "../components/RouteDropdown";
import SelectVigia from "../components/SelectVigia";
import { fetchRotas, assignUserToRoute } from "../api/rotaApi";
import { fetchUsers } from "../api/userService";
import { deleteRota } from "../api/rotaApi"; // importe a função de delete
import hamburguer from "../assets/img/list.svg";

export default function Rota() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rotas, setRotas] = useState<any[]>([]);
  const [vigias, setVigias] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSideOpen, setIsSideOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [rotasData, users] = await Promise.all([fetchRotas(), fetchUsers()]);
        const ativos = users.filter((u: any) => u.permissao === "vigia" && u.status === 1);

        // Adiciona idUsuario baseado no nome vindo do backend
        const rotasComId = rotasData.map((rota: any) => {
          const vigia = ativos.find(v => v.nomedeUsuario === rota.nomedeUsuario);
          return { ...rota, idUsuario: vigia ? vigia.idUsuario : null };
        });

        setRotas(rotasComId);
        setVigias(ativos);
      } catch {
        setError("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  

  const handleExpand = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleVigiaChange = async (idRota: number, idUsuario: number) => {
    const success = await assignUserToRoute(idRota, idUsuario);
    if (success) {
      setRotas(prev =>
        prev.map(r => (r.idRota === idRota ? { ...r, idUsuario } : r))
      );
    } else {
      alert("Erro ao atribuir vigia.");
    }
  };

  const handleDeleteRota = async (rota: any) => {
    const confirmDelete = window.confirm(`Deseja realmente excluir a rota ${rota.nomeRota}?`);
    if (!confirmDelete) return;
  
    const success = await deleteRota(rota.idRota);
    if (success) {
      setRotas(prev => prev.filter(r => r.idRota !== rota.idRota));
    } else {
      alert("Erro ao excluir a rota no servidor.");
    }
  };

  const rotaComExpand = rotas.map(r => ({
    ...r,
    expanded: r.idRota === expandedId,
  }));

  return (
    <div className={styles.coniner}>
      <div className={styles.hamburguer}>
        <a onClick={() => setIsSideOpen(!isSideOpen)} className={styles.sideButton}>
          <img src={hamburguer} alt="Menu" />
        </a>
      </div>

      <Sidebar isOpen={isSideOpen} closeSide={setIsSideOpen} />

      <div className={styles.table}>
        {loading && <p>Carregando rotas...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && (
          <ManagePage
            title="Gerenciar Rotas"
            description="Gerencie os locais que devem ser ligados com suas rondas"
            columns={[
              { label: "Nome", key: "nomeRota" },
              { label: "Horário de Início", key: "horarioInicio" },
              {
                label: "Vigia",
                render: (item) => (
                  <SelectVigia
                    idRota={item.idRota}
                    initialVigiaId={item.idUsuario}
                    vigias={vigias}
                    onChange={(idUsuario) => handleVigiaChange(item.idRota, idUsuario)}
                  />
                ),
              },
            ]}
            data={rotaComExpand}
            onAdd={() => setIsModalOpen(true)}
            onEdit={(item) => handleExpand(item.idRota)}
            onDelete={handleDeleteRota} // agora chama a função de delete
          >
            {(item) => item.expanded && <RouteDropdown idRota={item.idRota} />}
          </ManagePage>
        )}
      </div>

      {isModalOpen && (
        <CreateRouteModal
          onClose={() => setIsModalOpen(false)}
          onRouteCreated={(novaRota) => setRotas(prev => [...prev, novaRota])}
        />
      )}
    </div>
  );
}
