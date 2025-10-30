import React, { useEffect, useState } from 'react';
import GenericModal from './GenericModal';
import styles from '../../styles/modals/CreatRouteModal.module.css';
import { fetchUsers, fetchLocais, createRoute } from '../../api/userService';
import SelectGeneratorLocal, { LocalItem } from '../SelectGeneratorLocal';
import TimePicker from '../TimePicker';

// interface Vigia {
//   idUsuario: number;
//   nomedeUsuario: string;
//   status: number;
//   permissao: string;
// }

interface HorarioLocal {
  idLocal: number;
  nomeLocal: string;
  horario: string;
}

interface CreateRouteModalProps {
  onClose: () => void;
  onRouteCreated: (novaRota: any) => void;
}

const CreateRouteModal: React.FC<CreateRouteModalProps> = ({ onClose, onRouteCreated }) => {
  const [nomeRota, setNomeRota] = useState('');
  // const [vigias, setVigias] = useState<Vigia[]>([]);
  const [vigiaSelecionado, setVigiaSelecionado] = useState('');
  const [horarioInicio, setHorarioInicio] = useState('');
  const [locais, setLocais] = useState<LocalItem[]>([]);
  const [selectedLocais, setSelectedLocais] = useState<number[]>([]);
  const [itinerario, setItinerario] = useState<HorarioLocal[]>([
    { idLocal: 0, nomeLocal: '', horario: '' }
  ]);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   (async () => {
  //     const users = await fetchUsers();
  //     // setVigias(users.filter((v: Vigia) => v.status === 1 && v.permissao === 'vigia'));
  //     const locaisList = await fetchLocais();
  //     setLocais(locaisList);
  //   })();
  // }, []);

  useEffect(() => {
    if (selectedLocais.length === 0) {
      setItinerario([{ idLocal: 0, nomeLocal: '', horario: '' }]);
    } else {
      const novaLista = selectedLocais.map((id) => {
        const local = locais.find((l) => l.idLocal === id);
        return local ? { idLocal: id, nomeLocal: local.nomeLocal, horario: '' } : null;
      }).filter(Boolean) as HorarioLocal[];
      setItinerario(novaLista);
    }
  }, [selectedLocais, locais]);

  const handleSubmit = async () => {
    const palavraCount = nomeRota.trim().split(/\s+/).filter(p => p !== '').length;
    if (palavraCount < 5) {
      setError("O nome da rota deve ter pelo menos 5 palavras.");
      return;
    }
  
    if (!nomeRota || itinerario.some((it) => !it.horario)) {
      setError("Preencha todos os campos e horários.");
      return;
    }
  
    const idLocalArray = itinerario.map((item) => item.idLocal);
    const horarioLocaisArray = itinerario.map((item) => item.horario);
  
    const payload = {
      nomeRota,
      horarioInicio,
      idUsuario: Number(vigiaSelecionado),
      idLocal: idLocalArray,
      horarioLocais: horarioLocaisArray,
    };
  
    try {
      const data = await createRoute(payload);
      onRouteCreated(data);
      onClose();
      window.location.reload(); 
    } catch (error) {
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

      <div className={styles.labelhor}>
        <label className={styles.label}>Nome da rota</label>
        <input
          className={styles.createRouteInput}
          type="text"
          placeholder="Nome da rota"
          value={nomeRota}
          onChange={(e) => setNomeRota(e.target.value)}
        />
      </div>

      <div className={styles.labelhor}>
  <label className={styles.label}>Horário de Início</label>
  <input
    className={styles.createRouteInput}
    type="time"
    value={horarioInicio}
    onChange={(e) => setHorarioInicio(e.target.value)}
  />
</div>

      <SelectGeneratorLocal
        list={locais}
        selectedArray={selectedLocais}
        setAtualLocal={setSelectedLocais}
      />

      {/* Área com rolagem para locais e horários */}
      <div className={styles.scrollArea}>
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

    </GenericModal>
  );
};

export default CreateRouteModal;
