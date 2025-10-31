import LeafletComponentMap from './LeafLetComponentMap';
import { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/modals/ModalLocal.module.css';

interface ModalLocalProps {
  reload?: boolean;
  onClose: () => void;
}

const ModalLocal = ({ reload, onClose }: ModalLocalProps) => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [nomeLocal, setNomeLocal] = useState('');

  const criarLocal = async () => {
    try {
      await axios.post("http://192.168.1.8:9010/local/create", {
        nomeLocal,
        latitude: position.latitude,
        longitude: position.longitude,
        idSetor: 1,
      });
      alert('Local criado com sucesso!');
      onClose();
    } catch (error) {
      console.error(error);
      alert('Erro ao criar local');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
        
  <div className={styles.mapContainer}>
    <LeafletComponentMap setPosition={setPosition} />
    <button className={styles.closeButton} onClick={onClose}>X</button>
  </div>

  <div className={styles.form}>
    <div>
      <h1>Criar novo local</h1>
      <input
        placeholder="Nome do Local"
        value={nomeLocal}
        onChange={(e) => setNomeLocal(e.target.value)}
        required
      />
    </div>
    <button className={styles.botao} onClick={criarLocal}>
      CRIAR LOCAL
    </button>
  </div>
</div>

    </div>
  );
};

export default ModalLocal;
