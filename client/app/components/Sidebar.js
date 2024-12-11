import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ rollHistory, selectedDie, setSelectedDie, diceOptions, maxCount, minCount }) => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.historyTitle}>Roll History</h2>
      
      <select
        value={selectedDie}
        onChange={(e) => setSelectedDie(e.target.value)}
        className={styles.dropdown}
      >
        {diceOptions.map((die) => (
          <option key={die} value={die}>
            {die.toUpperCase()}
          </option>
        ))}
      </select>
      
      {/* Scrollable list with only 10 entries visible */}
      <div className={styles.scrollable}>
        <ul className={styles.historyList}>
          {rollHistory.map((roll, index) => (
            <li
              key={index}
              className={`${styles.historyItem} ${
                roll.isMax ? styles.maxRoll : roll.isMin ? styles.minRoll : ''
              }`}
            >
              {roll.die.toUpperCase()} - {roll.result}
            </li>
          ))}
        </ul>
      </div>

      {/* Max/Min Roll Counters */}
      <div className={styles.counterContainer}>
        <p className={styles.counterText}>
          <span className={styles.maxRollCounter}>Max Rolls: {maxCount}</span>
        </p>
        <p className={styles.counterText}>
          <span className={styles.minRollCounter}>Min Rolls: {minCount}</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
