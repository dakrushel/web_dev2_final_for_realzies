import React, { useState } from 'react';
import styles from './AbilityCheck.module.css';

const AbilityCheck = () => {
  const [selectedAbility, setSelectedAbility] = useState('');
  const [modifier, setModifier] = useState('');
  const [rollResult, setRollResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [rollHistory, setRollHistory] = useState([]);

  const abilityOptions = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];

  const rollDice = (sides) => Math.floor(Math.random() * sides) + 1;

  const handleRoll = () => {
    if (!selectedAbility) {
      setErrorMessage('Please select an ability.');
      return;
    }

    const roll = rollDice(20); // Roll a d20
    const modifierValue = parseInt(modifier, 10) || 0; // Parse the modifier, default to 0 if empty
    const total = roll + modifierValue;

    setRollResult({ roll, modifier: modifierValue, total });

    // Update roll history
    setRollHistory((prevHistory) => [
      { ability: selectedAbility, roll, modifier: modifierValue, total },
      ...prevHistory.slice(0, 9), // Limit history to 10 items
    ]);

    setErrorMessage('');
  };

  const handleReset = () => {
    setSelectedAbility('');
    setModifier('');
    setRollResult(null);
    setErrorMessage('');
  };

  return (
    <div className={styles.abilityCheckContainer}>
      <h1 className={styles.abilityCheckTitle}>Ability Check</h1>

      <div className={styles.abilityCheckForm}>
        <label className={styles.inputLabel}>Select Ability</label>
        <select
          className={styles.abilityDropdown}
          value={selectedAbility}
          onChange={(e) => setSelectedAbility(e.target.value)}
        >
          <option value="">-- Choose an Ability --</option>
          {abilityOptions.map((ability) => (
            <option key={ability} value={ability}>
              {ability}
            </option>
          ))}
        </select>

        <label className={styles.inputLabel}>Enter Modifier</label>
        <input
          type="number"
          className={styles.inputField}
          value={modifier}
          onChange={(e) => setModifier(e.target.value)}
          placeholder="Enter modifier (e.g., +2 or -1)"
        />

        <button className={styles.checkButton} onClick={handleRoll}>
          Roll
        </button>
        <button className={styles.resetButton} onClick={handleReset}>
          Reset
        </button>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        {rollResult && (
          <div className={styles.abilityResult}>
            <p>
              You rolled <strong>{rollResult.roll}</strong> + Modifier <strong>{rollResult.modifier}</strong>
            </p>
            <p>
              Total: <strong>{rollResult.total}</strong>
            </p>
          </div>
        )}
      </div>

      <div className={styles.historyContainer}>
        <h2 className={styles.historyTitle}>Roll History</h2>
        <ul className={styles.historyList}>
          {rollHistory.map((entry, index) => (
            <li
              key={index}
              className={`${styles.historyItem} ${
                entry.total === 20 ? styles.maxResult : entry.total === 1 ? styles.minResult : ''
              }`}
            >
              <span>
                <strong>{entry.ability}:</strong> {entry.roll} + {entry.modifier} = {entry.total}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AbilityCheck;