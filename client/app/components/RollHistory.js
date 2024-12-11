import React from 'react';
import styles from './RollHistory.module.css';

const RollHistory = ({ history }) => {
  return (
    <div className={styles.historyContainer}>
      <h2>Roll History</h2>
      <ul className={styles.historyList}>
        {history.map((entry, index) => (
          <li key={index}>
            You rolled a <strong>{entry.die}</strong>: {entry.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RollHistory;
