
import React, { ChangeEvent } from 'react';
import styles from "../styles/modals/CreatRouteModal.module.css"

interface TimePickerProps {
  time: string;
  setTime: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ time, setTime }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

  const [currentHour, currentMinute] = time.split(':');

  const handleHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTime(`${e.target.value}:${currentMinute || '00'}`);
  };

  const handleMinuteChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTime(`${currentHour || '00'}:${e.target.value}`);
  };

  return (
    <div className={styles.contime}>
      <select
        className={styles.RouteInput}
        value={currentHour || '00'}
        onChange={handleHourChange}
      >
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>
      :
      <select
        className={styles.RouteInput}
        value={currentMinute || '00'}
        onChange={handleMinuteChange}
      >
        {minutes.map((minute) => (
          <option key={minute} value={minute}>
            {minute}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimePicker;
