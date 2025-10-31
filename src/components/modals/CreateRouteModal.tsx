import React, { useEffect, useState } from 'react';
import GenericModal from './GenericModal';
import styles from '../../styles/modals/CreatRouteModal.module.css';
import { createRoute } from '../../api/userService'; // Removido fetchUsers
import SelectGeneratorLocal, { LocalItem } from '../SelectGeneratorLocal';
import TimePicker from '../TimePicker';
import { useLocal } from '../../hooks/useLocal';
import Button from '../Button';

// Removida interface Vigia

interface HorarioLocal {
  idLocal: number;
  nomeLocal: string;
  horario: string;
}

interface CreateRouteModalProps {
  onClose: () => void;
  onRouteCreated: (novaRota: any) => void;
  // Sugestão: Se o ID do Vigia vem da tela anterior, adicione-o aqui:
  // idVigiaResponsavel: number; 
}

const CreateRouteModal: React.FC<CreateRouteModalProps> = ({ onClose, onRouteCreated }) => {
  const { Local } = useLocal();

  const [nomeRota, setNomeRota] = useState('');
  // Removido: const [vigias, setVigias] = useState<Vigia[]>([]);
  // Removido: const [vigiaSelecionado, setVigiaSelecionado] = useState('');
  const [horarioInicio, setHorarioInicio] = useState('');
  const [selectedLocais, setSelectedLocais] = useState<number[]>([]);
  const [itinerario, setItinerario] = useState<HorarioLocal[]>([]);
  const [error, setError] = useState('');

  // Removido: Efeito para buscar os Vigias

  // 2. Efeito CORRIGIDO: Preserva os horários já definidos (Lógica mantida, pois está correta para o problema anterior)
  useEffect(() => {
    // 1. Cria um mapa de horários existentes para consulta rápida
    const horarioMap = itinerario.reduce((map, item) => {
      map.set(item.idLocal, item.horario);
      return map;
    }, new Map<number, string>());

    // 2. Filtra e mapeia apenas os locais atualmente selecionados
    const novaLista = selectedLocais
      .map((id) => {
        const local = Local.find((l: LocalItem) => l.idLocal === id);

        if (!local) return null;

        // 3. Usa o horário do mapa (se existir) ou define como '' (se for um novo local)
        const horarioExistente = horarioMap.get(id) || '';

        return {
          idLocal: id,
          nomeLocal: local.nomeLocal,
          horario: horarioExistente // Usa o horário preservado
        };
      })
      .filter(Boolean) as HorarioLocal[];

    // 4. Define o novo itinerário
    setItinerario(novaLista);

  }, [selectedLocais, Local]);

  const handleSubmit = async () => {
    setError('');

    // **CORREÇÃO 1: Lógica de contagem de palavras aprimorada**
    //     const palavraCount = nomeRota.trim().split(/\s+/).filter(p => p.length > 0).length;
    //     if (palavraCount < 5) {
    //       setError("O nome da rota deve ter pelo menos 5 palavras.");
    //       return;
    //     }

    // Removido: if (!vigiaSelecionado) ...
    // Note: Se o ID do vigia for 1, a validação é desnecessária por enquanto.

    if (!horarioInicio) {
      setError("Selecione o horário de início da rota.");
      return;
    }

    if (itinerario.length === 0 || itinerario.some((it) => !it.horario)) {
      setError("Selecione locais e preencha todos os horários do itinerário.");
      return;
    }

    const idLocalArray = itinerario.map((item) => item.idLocal);
    const horarioLocaisArray = itinerario.map((item) => item.horario);

    // **CORREÇÃO 2: ID do Usuário (Vigia) mockado/assumido**
    // **AVISO:** Substitua '1' pela prop 'idVigiaResponsavel' se estiver passando de outra tela.
    const idUsuarioResponsavel = 1; // ID mockado. Passe via props se for necessário.

    const payload = {
      nomeRota,
      horarioInicio,
      idUsuario: idUsuarioResponsavel, // Usando o valor mockado/assumido
      idLocal: idLocalArray,
      horarioLocais: horarioLocaisArray,
    };

    try {
      const data = await createRoute(payload);
      onRouteCreated(data);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Erro na criação da rota:", error);
      setError("Erro ao criar rota. Verifique os dados e tente novamente.");
    }
  };


  return (
    <GenericModal
      titlee="Criar nova rota"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonTam="PPP"
      buttonText="Criar rota"
    >
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.container}>

        {/* Nome da Rota */}
        <div className={styles.containerInput}>
          <label className={styles.label}>Nome da rota</label>
          <input
            className={styles.createRouteInput}
            type="text"
            placeholder="Nome da rota (mínimo 5 palavras)"
            value={nomeRota}
            onChange={(e) => setNomeRota(e.target.value)}
          />
          <label className={styles.label}>Horário de Início</label>
          <input
            className={styles.createRouteInput}
            type="time"
            value={horarioInicio}
            onChange={(e) => setHorarioInicio(e.target.value)}
          />
        </div>

        {/* Removido: Seleção de Vigia */}
        {/* <div className={styles.labelhor}>
        <label className={styles.label}>Vigia Responsável</label>
        <select ...> ... </select>
      </div> 
      */}

        {/* Seleção dos Locais (Componente externo) */}
        <div className={styles.selectLocal}>
          <SelectGeneratorLocal
            list={Local}
            selectedArray={selectedLocais}
            setAtualLocal={setSelectedLocais}
          />
        </div>

        {/* Área com rolagem para locais e horários de parada */}
        <div className={styles.scrollAreaContainer}>
        {itinerario.length > 0 && (
          <div className={styles.scrollArea}>
            <label className={styles.label}>Horários de Parada por Local</label>
            {itinerario.map((item, index) => (
              <div className={styles.div3} key={item.idLocal}>
                <div className={styles.createRouteRow}>
                  <input
                    className={styles.createRouteInput1}
                    value={item.nomeLocal}
                    readOnly
                  />
                  <TimePicker
                    time={item.horario}
                    setTime={(horario) =>
                      setItinerario((prev) =>
                        prev.map((it, idx) =>
                          idx === index ? { ...it, horario } : it
                        )
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
        <div className={styles.Botao}>
          <Button title={"Adicionar Rota"} script={handleSubmit} tamanho="MM" />
        </div>
      </div>
    </GenericModal>
  );
};

export default CreateRouteModal;