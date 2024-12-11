import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ rollHistory, selectedDie, setSelectedDie, diceOptions, maxCount, minCount }) => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.historyTitle}>Roll History</h2>

      {/* Dropdown for selecting dice */}
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

      {/* Scrollable roll history */}
      <div className={styles.scrollable}>
        <ul className={styles.historyList}>
          {rollHistory.map((roll, index) => (
            <li
              key={index}
              className={`${styles.historyItem} ${
                roll.result === roll.sides ? styles.maxRoll : roll.result === 1 ? styles.minRoll : ''
              }`}
            >
              {selectedDie.toUpperCase()} - {roll.result}
            </li>
          ))}
        </ul>
      </div>

      {/* Max/Min Roll Counters */}
      <div className={styles.counterContainer}>
        <p className={styles.counterText}>
          Max Rolls: <span className={styles.maxRollCounter}>{maxCount}</span>
        </p>
        <p className={styles.counterText}>
          Min Rolls: <span className={styles.minRollCounter}>{minCount}</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
