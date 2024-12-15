import { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar for displaying roll history
import styles from './RNGesus.module.css';
import { useUser } from './UserContext';
import { logRoll, fetchRollHistory } from "../api/rollsApi";
 

const RNGesus = () => {
  const { user } = useUser(); // Uses UserContext
  const [rollResult, setRollResult] = useState(null);
  const [selectedDie, setSelectedDie] = useState('d20');
  const [rollMode, setRollMode] = useState('neutral');
  const [otherRoll, setOtherRoll] = useState(null);
  const [rollHistories, setRollHistories] = useState({
    d4: [],
    d6: [],
    d8: [],
    d10: [],
    d12: [],
    d20: [],
    d100: [],
  });
  
  const [maxMinCount, setMaxMinCount] = useState({ maxCount: 0, minCount: 0 });

  useEffect(() => {
    const loadRollHistory = async () => {
      if (user?.id) {
        try {
          const data = await fetchRollHistory();
          if (Array.isArray(data)) {
            const newHistories = {
              d4: [],
              d6: [],
              d8: [],
              d10: [],
              d12: [],
              d20: [],
              d100: [],
            };

            data.forEach((roll) => {
              if (newHistories[roll.rollType]) {
                newHistories[roll.rollType].push({
                  result: roll.result,
                  sides: parseInt(roll.rollType.slice(1), 10),
                });
              }
            });

            setRollHistories(newHistories);
          } else {
            console.error('Error fetching roll history: Expected an array but got', typeof data);
          }
        } catch (err) {
          console.error('Error fetching roll history:', err.message);
        }
      } else {
        setRollHistories({
          d4: [],
          d6: [],
          d8: [],
          d10: [],
          d12: [],
          d20: [],
          d100: [],
        });
      }
    };

    loadRollHistory();
  }, [user?.id]);

  useEffect(() => {
    const currentRollHistory = rollHistories[selectedDie] || [];
    const { maxCount, minCount } = calculateMaxMinCount(currentRollHistory);
    setMaxMinCount({ maxCount, minCount });
  }, [rollHistories, selectedDie]);

  const rollEm = (sides) => Math.floor(Math.random() * sides) + 1;

  const handleRoll = async () => {
    const sides = parseInt(selectedDie.slice(1), 10);
    let result;
    let roll1, roll2;

    if (rollMode === 'advantage') {
      roll1 = rollEm(sides);
      roll2 = rollEm(sides);
      result = Math.max(roll1, roll2);
      setOtherRoll({ roll1, roll2, mode: 'Advantage', selected: result });
    } else if (rollMode === 'disadvantage') {
      roll1 = rollEm(sides);
      roll2 = rollEm(sides);
      result = Math.min(roll1, roll2);
      setOtherRoll({ roll1, roll2, mode: 'Disadvantage', selected: result });
    } else {
      result = rollEm(sides);
      setOtherRoll(null);
    }

    setRollResult(result);

    if (user?.id) {
      try {
        await logRoll(selectedDie, result);
        setRollHistories((prev) => ({
          ...prev,
          [selectedDie]: [{ result, sides }, ...prev[selectedDie]].slice(0, 10),
        }));
      } catch (err) {
        console.error('Error saving roll:', err.message);
      }
    }
  };

  // Function to calculate max and min rolls
  const calculateMaxMinCount = (history) => {
    let maxCount = 0;
    let minCount = 0;
    history.forEach((roll) => {
      if (roll.result === roll.sides) maxCount += 1;
      if (roll.result === 1) minCount += 1;
    });
    return { maxCount, minCount };
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <h1 className={styles.title}>Roll Away!</h1>

        {/* Dice Selection */}
        <ul className={styles.diceList}>
          {['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'].map((die) => (
            <li
              key={die}
              className={`${styles.die} ${selectedDie === die ? styles.selectedGreen : ''}`}
              onClick={() => setSelectedDie(die)}
            >
              {die.toUpperCase()}
            </li>
          ))}
        </ul>

        {/* Roll Mode Buttons */}
        <div className={styles.rollModeButtons}>
          <button
            className={`${styles.button} ${rollMode === 'advantage' ? styles.selectedGreen : ''}`}
            onClick={() => setRollMode('advantage')}
          >
            Advantage
          </button>
          <button
            className={`${styles.button} ${rollMode === 'disadvantage' ? styles.selectedGreen : ''}`}
            onClick={() => setRollMode('disadvantage')}
          >
            Disadvantage
          </button>
          <button
            className={`${styles.button} ${rollMode === 'neutral' ? styles.selectedGreen : ''}`}
            onClick={() => setRollMode('neutral')}
          >
            Neutral
          </button>
        </div>

        {/* Roll Button */}
        <button onClick={handleRoll} className={styles.button}>
          Roll
        </button>

        {/* Roll Result */}
        {rollResult !== null && (
          <p className={styles.result}>
            You rolled a <strong>{selectedDie.toUpperCase()}</strong>: {rollResult}
          </p>
        )}
        {otherRoll && (
          <p className={styles.otherRollResult}>
            {otherRoll.mode}: Roll 1 = {otherRoll.roll1}, Roll 2 = {otherRoll.roll2}. Selected: {otherRoll.selected}.
          </p>
        )}

        {/* Max/Min Count Display */}
        <div>
          <p>Max Rolls: {maxMinCount.maxCount}</p>
          <p>Min Rolls: {maxMinCount.minCount}</p>
        </div>
      </div>

      {/* Sidebar for Roll History */}
      <Sidebar 
  rollHistory={rollHistories[selectedDie]} 
  selectedDie={selectedDie} 
  maxCount={maxMinCount.maxCount} 
  minCount={maxMinCount.minCount} 
/>
    </div>
  );
};

export default RNGesus;
