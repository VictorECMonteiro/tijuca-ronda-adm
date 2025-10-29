import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { ManagePage } from "../components/table/ManagePage";
import CreateRouteModal from "../components/modals/CreateRouteModal";
import styles from "../styles/pages/Logs.module.css";
import RouteDropdown from "../components/RouteDropdown";
import SelectVigia from "../components/SelectVigia";
import { fetchRotas, assignUserToRoute, deleteRota } from "../api/rotaApi";
import { fetchUsers } from "../api/userService";
import hamburguer from "../assets/img/list.svg";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import LoadingComponent from "../components/LoadingComponent";

export default function Rota() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rotas, setRotas] = useState<any[]>([]);
  const [vigias, setVigias] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [error, setError] = useState("");
  const [isSideOpen, setIsSideOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRota, setSelectedRota] = useState<any | null>(null);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [rotasData, users] = await Promise.all([fetchRotas(), fetchUsers()]);
        const ativos = users.filter((u: any) => u.permissao === "vigia" && u.status === 1);
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
  }, [reload]);

  const handleExpand = (id: number) => setExpandedId(prev => (prev === id ? null : id));

  const handleVigiaChange = async (idRota: number, idUsuario: number) => {
    setLoadingAction(true);
    const success = await assignUserToRoute(idRota, idUsuario);
    if (success) setReload(!reload);
    else alert("Erro ao atribuir vigia.");
    setLoadingAction(false);
  };

  const handleDeleteClick = (rota: any) => {
    setSelectedRota(rota);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedRota) return;
    setLoadingAction(true);
    const success = await deleteRota(selectedRota.idRota);
    if (success) setReload(!reload);
    else alert("Erro ao excluir a rota.");
    setIsDeleteModalOpen(false);
    setLoadingAction(false);
  };

  const rotaComExpand = rotas.map(r => ({ ...r, expanded: r.idRota === expandedId }));
  if (loading) return <LoadingComponent />;

  return (
    <div className={styles.coniner}>
      <div className={styles.hamburguer}>
        <a onClick={() => setIsSideOpen(!isSideOpen)} className={styles.sideButton}>
          <img src={hamburguer} alt="Menu" />
        </a>
      </div>

      <Sidebar isOpen={isSideOpen} closeSide={setIsSideOpen} />

      <div className={styles.table}>
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
            onDelete={handleDeleteClick}
          >
            {(item) => item.expanded && <RouteDropdown idRota={item.idRota} />}
          </ManagePage>
        )}
      </div>

      {isModalOpen && (
        <CreateRouteModal
          onClose={() => setIsModalOpen(false)}
          onRouteCreated={() => setReload(!reload)}
        />
      )}

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        message={`Deseja realmente excluir a rota "${selectedRota?.nomeRota}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
