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
        aria-label="Select dice type"
        disabled={diceOptions.length === 0}
      >
        {diceOptions.map((die) => (
          <option key={die} value={die}>
            {die.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Scrollable roll history */}
      <div className={styles.scrollable}>
        {rollHistory.length > 0 ? (
          <ul className={styles.historyList} aria-label={`Roll history for ${selectedDie.toUpperCase()}`}>
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
        ) : (
          <p className={styles.noHistory}>No rolls yet for {selectedDie.toUpperCase()}.</p>
        )}
      </div>

      {/* Max/Min Roll Counters */}
      <div className={styles.counterContainer}>
        <div className={styles.counter}>
          <span className={styles.counterLabel}>Max Rolls:</span>
          <span className={styles.counterValue}>{maxCount}</span>
        </div>
        <div className={styles.counter}>
          <span className={styles.counterLabel}>Min Rolls:</span>
          <span className={styles.counterValue}>{minCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;