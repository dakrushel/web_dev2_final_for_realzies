import React, { useState } from 'react';
import styles from './CustomRollInput.module.css';
import { diceOptions } from './RNGesus';

const CustomRoll = ({ onAddCustomRoll }) => {
  const [title, setTitle] = useState('');
  const [selectedDie, setSelectedDie] = useState(diceOptions[0]);
  const [modifier, setModifier] = useState(0);

  const handleAddCustomRoll = () => {
    if (!title.trim()) {
      alert('Please provide a title for the custom roll.');
      return;
    }

    onAddCustomRoll({
      title,
      die: selectedDie,
      modifier: parseInt(modifier, 10),
    });

    setTitle(''); // Reset form
    setSelectedDie(diceOptions[0]);
    setModifier(0);
  };

  return (
    <div className={styles.customRollContainer}>
      <h2 className={styles.customRollTitle}>Create a Custom Roll</h2>

      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.formLabel}>
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.inputField}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="die" className={styles.formLabel}>
          Die Type:
        </label>
        <select
          id="die"
          value={selectedDie}
          onChange={(e) => setSelectedDie(e.target.value)}
          className={styles.selectField}
        >
          {diceOptions.map((die) => (
            <option key={die} value={die}>
              {die.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="modifier" className={styles.formLabel}>
          Modifier:
        </label>
        <input
          type="number"
          id="modifier"
          value={modifier}
          onChange={(e) => setModifier(e.target.value)}
          className={styles.inputField}
        />
      </div>

      <button onClick={handleAddCustomRoll} className={styles.addButton}>
        Add Custom Roll
      </button>
    </div>
  );
};

export default CustomRoll;
