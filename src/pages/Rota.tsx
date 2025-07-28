import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { ManagePage } from "../components/table/ManagePage";
import CreateRouteModal from "../components/modals/CreateRouteModal";
import styles from "../styles/pages/Users.module.css";
import RouteDropdown from "../components/RouteDropdown";
import SelectVigia from "../components/SelectVigia";
import { fetchRotas } from "../api/rotaApi";

export default function Rota() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rotas, setRotas] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const loadRotas = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchRotas();
      setRotas(data);
    } catch {
      setError("Erro ao carregar rotas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRotas();
  }, []);

  const rotaComExpand = rotas.map((r) => ({
    ...r,
    expanded: r.idRota === expandedId,
  }));

  return (
    <div className={styles.coniner}>
      <Sidebar />
      <div className={styles.content}>
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
                    onChange={(idUsuario) => {
                      console.log("Vigia definido:", idUsuario, "para rota", item.idRota);
                    }}
                  />
                ),
              },
            ]}
            data={rotaComExpand}
            onAdd={() => setIsModalOpen(true)}
            onEdit={(item) => handleExpand(item.idRota)}
            onDelete={(route) => console.log("Excluir:", route)}
          >
            {(item) => item.expanded && <RouteDropdown idRota={item.idRota} />}
          </ManagePage>
        )}
      </div>

      {isModalOpen && (
        <CreateRouteModal
          onClose={() => setIsModalOpen(false)}
          onRouteCreated={(novaRota) => {
            setRotas((prev) => [...prev, novaRota]);
          }}
        />
      )}
    </div>
  );
}
