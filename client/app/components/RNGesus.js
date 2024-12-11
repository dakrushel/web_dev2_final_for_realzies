import React, { useState } from 'react';
import styles from './RNGesus.module.css';
import Sidebar from './Sidebar';

const RNGesus = () => {
  const [rollResult, setRollResult] = useState(null);
  const [selectedDie, setSelectedDie] = useState('d20');
  const [rollMode, setRollMode] = useState('neutral'); 
  const [otherRoll, setOtherRoll] = useState(null); 

  /* Store history and max/min count for each dice type */
  const [rollHistories, setRollHistories] = useState({
    d4: { rolls: [], maxCount: 0, minCount: 0 },
    d6: { rolls: [], maxCount: 0, minCount: 0 },
    d8: { rolls: [], maxCount: 0, minCount: 0 },
    d10: { rolls: [], maxCount: 0, minCount: 0 },
    d12: { rolls: [], maxCount: 0, minCount: 0 },
    d20: { rolls: [], maxCount: 0, minCount: 0 },
    d100: { rolls: [], maxCount: 0, minCount: 0 },
  });

  const diceOptions = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];

  const rollEm = (sides) => Math.floor(Math.random() * sides) + 1;

  /* Function to handle the roll */
  const handleRoll = () => {
    const sides = parseInt(selectedDie.slice(1), 10);

    let result;
    let roll1, roll2;

    /* Handle Advantage, Disadvantage, or Neutral roll */
    if (rollMode === 'advantage') {
      /* Roll twice and take the highest */
      roll1 = rollEm(sides);
      roll2 = rollEm(sides);
      result = Math.max(roll1, roll2);
      setOtherRoll({ roll1, roll2, selected: result === roll1 ? roll1 : roll2, mode: 'Advantage' });
    } else if (rollMode === 'disadvantage') {
      /* Roll twice and take the lowest */
      roll1 = rollEm(sides);
      roll2 = rollEm(sides);
      result = Math.min(roll1, roll2);
      setOtherRoll({ roll1, roll2, selected: result === roll1 ? roll1 : roll2, mode: 'Disadvantage' });
    } else {
      /* Normal roll (Neutral) */
      result = rollEm(sides);
      setOtherRoll(null); 
    }

    const isMax = result === sides;
    const isMin = result === 1;

    /* Prepare new roll object */
    const newRoll = {
      die: selectedDie,
      result,
      isMax,
      isMin,
    };

    setRollHistories((prevHistories) => {
      const currentHistory = prevHistories[selectedDie].rolls;
      const newHistory = [newRoll, ...currentHistory].slice(0, 10); 

      const maxCount = prevHistories[selectedDie].maxCount + (isMax ? 1 : 0);
      const minCount = prevHistories[selectedDie].minCount + (isMin ? 1 : 0);

      return {
        ...prevHistories,
        [selectedDie]: {
          rolls: newHistory,
          maxCount,
          minCount,
        },
      };
    });

    setRollResult(result);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <h1 className={styles.title}>Roll Away!</h1>
        <ul className={styles.diceList}>
          {diceOptions.map((die) => (
            <li
              key={die}
              className={`${styles.die} ${selectedDie === die ? styles.selected : ''}`}
              onClick={() => setSelectedDie(die)}
            >
              {die.toUpperCase()}
            </li>
          ))}
        </ul>

        {/* Advantage/Disadvantage/Neutral Buttons */}
        <div className={styles.rollModeButtons}>
          <button
            className={`${styles.button} ${rollMode === 'advantage' ? styles.selected : ''}`}
            onClick={() => setRollMode('advantage')}
          >
            Advantage
          </button>
          <button
            className={`${styles.button} ${rollMode === 'disadvantage' ? styles.selected : ''}`}
            onClick={() => setRollMode('disadvantage')}
          >
            Disadvantage
          </button>
          <button
            className={`${styles.button} ${rollMode === 'neutral' ? styles.selected : ''}`}
            onClick={() => setRollMode('neutral')}
          >
            Neutral
          </button>
        </div>

        <button onClick={handleRoll} className={styles.button}>
          Roll
        </button>

        {rollResult !== null && (
          <p className={styles.result}>
            You rolled a <strong>{selectedDie.toUpperCase()}</strong>: {rollResult}
          </p>
        )}

        {/* Show both rolls for Advantage/Disadvantage */}
        {otherRoll && (
          <p className={styles.otherRollResult}>
            {otherRoll.mode}: Roll 1 = {otherRoll.roll1}, Roll 2 = {otherRoll.roll2}. You got: {otherRoll.selected}.
          </p>
        )}
      </div>

      {/* Sidebar Component */}
      <Sidebar
        rollHistory={rollHistories[selectedDie].rolls} 
        selectedDie={selectedDie}
        setSelectedDie={setSelectedDie}
        diceOptions={diceOptions}
        maxCount={rollHistories[selectedDie].maxCount} 
        minCount={rollHistories[selectedDie].minCount} 
      />
    </div>
  );
};

export default RNGesus;
