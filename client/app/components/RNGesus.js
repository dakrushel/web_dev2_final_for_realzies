import React, { useState } from 'react';
import styles from './RNGesus.module.css';

const RNGesus = () => {
  const [rollResult, setRollResult] = useState(null);
  const [selectedDie, setSelectedDie] = useState('d20');
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  //Dice rolling logic
  const rollEm = (sides) => Math.floor(Math.random() * sides) + 1;

  //For all your other RNG needs
  const pickANumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;

  }

  //Handle dice rolling
  const handleRoll = () => {
    const sides = parseInt(selectedDie.slice(1), 10); //should extract int from die type eg. d20
    const result = rollEm(sides);
    setRollResult(result);
  };

  //Handle random number generation
  const handlePickANumber = () => {
    try {
      const minValue = parseInt(min, 10);
      const maxValue = parseInt(max, 10);

      if (isNaN(minValue) || isNaN(maxValue)) {
        throw new Error("Error: enter a valid number for min and max");
      }
      if (minValue < 0 || maxValue < 0) {
        throw new Error("Error: only positive integers are allowed")
      }
      if (min === max) {
        throw new Error("Error: numbers cannot be equal")
      }

      let randNum = 0;
      if (minValue > maxValue) {
        randNum = pickANumber(maxValue, minValue);
        setResult(randNum);
        setError("");
      }
      randNum = pickANumber(minValue, maxValue);
      setResult(randNum);
      setError("");
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  }

  return (
    <div className={styles.container}>
      <div>
      <h1 className={styles.title}>Roll Away!</h1>
      <p className={styles.label}>Select Die:</p>
      <ul className={styles.diceList}>
        {['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'].map((die) => (
          <li key={die}
          className={`${styles.die} ${selectedDie == die? styles.selected : ''}`}
          onClick={() => setSelectedDie(die)}>
            {die.toUpperCase()}
          </li>
        ))}
      </ul>
      <button onClick={handleRoll} className={styles.button}>Roll</button>
      {rollResult !== null && (
        <p className={styles.result}>
          You rolled a <strong>{selectedDie.toUpperCase()}</strong>: {rollResult}
        </p>
      )}
      </div>

      <div>
        <h1 className={styles.title}>Pick A Number</h1>
        <label className={styles.label}>
          Min:
            <input type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className={styles.input} />
        </label>
        <label className={styles.label}>
          Max:
            <input type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className={styles.input} />
        </label>
        <button onClick={handlePickANumber} className='ml-10'>Pick</button>
        {error && <p className='color red-500'>{error}</p>}
        {result !== null && (
          <p>Number between {min} and {max}: <strong>{result}</strong></p>
        )}
      </div>
    </div>
  );
};

export default RNGesus