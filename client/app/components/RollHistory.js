'use client';
import React, { useEffect, useState } from 'react';
import styles from './RollHistory.module.css';

const RollHistory = ({ localHistory, userId }) => {
  const [savedRolls, setSavedRolls] = useState([]);

  // Fetch saved rolls if user is signed in
  useEffect(() => {
    const fetchSavedRolls = async () => {
      if (!userId) return; // Only fetch for logged-in users

      try {
        const res = await fetch(`http://localhost:5000/rolls/${userId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch roll history');
        }
        const data = await res.json();
        setSavedRolls(data);
      } catch (err) {
        console.error('Error fetching roll history:', err.message);
      }
    };

    fetchSavedRolls();
  }, [userId]);

  // Combine local history and saved rolls
  const combinedHistory = userId ? savedRolls : localHistory;

  return (
    <div className={styles.historyContainer}>
      <h2>Roll History</h2>
      <ul className={styles.historyList}>
        {combinedHistory.length > 0 ? (
          combinedHistory.map((entry, index) => (
            <li key={index} className={styles.historyItem}>
              <span>
                Rolled a <strong>{entry.rollType.toUpperCase()}</strong>: {entry.result}
              </span>
            </li>
          ))
        ) : (
          <p className={styles.noHistory}>No rolls yet!</p>
        )}
      </ul>
    </div>
  );
};

export default RollHistory;
