import { useState } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar for displaying roll history
import styles from './RNGesus.module.css';

const RNGesus = () => {
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

  const [selectedAbility, setSelectedAbility] = useState('strength');
  const [abilityCheckResult, setAbilityCheckResult] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [skillCheckResult, setSkillCheckResult] = useState(null);

  const diceOptions = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];
  const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
  const skills = {
    strength: ['athletics'],
    dexterity: ['acrobatics', 'sleight-of-hand', 'stealth'],
    constitution: [],
    intelligence: ['arcana', 'history', 'investigation', 'nature', 'religion'],
    wisdom: ['animal handling', 'insight', 'medicine', 'perception', 'survival'],
    charisma: ['deception', 'intimidation', 'performance', 'persuasion'],
  };

  const rollEm = (sides) => Math.floor(Math.random() * sides) + 1;

  const handleRoll = () => {
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

    // Update Roll History
    setRollHistories((prev) => ({
      ...prev,
      [selectedDie]: [{ result, sides }, ...prev[selectedDie]].slice(0, 10),
    }));

    setRollResult(result);
  };

  const handleAbilityCheck = () => {
    const sides = 20; // D20 roll
    const roll = rollEm(sides);
    const modifiers = {
      strength: 2,
      dexterity: 3,
      constitution: 1,
      intelligence: 4,
      wisdom: 5,
      charisma: 6,
    };
    const modifier = modifiers[selectedAbility] || 0;
    const total = roll + modifier;

    setAbilityCheckResult({ roll, modifier, total });
    setSkillCheckResult(null); // Clear Skill Check results
  };

  const handleSkillCheck = () => {
    const sides = 20; // D20 roll
    const roll = rollEm(sides);
    const modifiers = {
      athletics: 2,
      acrobatics: 3,
      'sleight-of-hand': 2,
      stealth: 1,
      arcana: 4,
      history: 3,
      investigation: 4,
      nature: 2,
      religion: 5,
      'animal handling': 3,
      insight: 4,
      medicine: 2,
      perception: 5,
      survival: 4,
      deception: 2,
      intimidation: 3,
      performance: 4,
      persuasion: 2,
    };
    const modifier = modifiers[selectedSkill] || 0;
    const total = roll + modifier;

    setSkillCheckResult({ roll, modifier, total, skill: selectedSkill });
    setAbilityCheckResult(null); // Clear Ability Check results
  };

  // Calculate max and min rolls
  const calculateMaxMinCount = (history) => {
    let maxCount = 0;
    let minCount = 0;
    history.forEach((roll) => {
      if (roll.result === roll.sides) maxCount += 1;
      if (roll.result === 1) minCount += 1;
    });
    return { maxCount, minCount };
  };

  const currentRollHistory = rollHistories[selectedDie] || [];
  const { maxCount, minCount } = calculateMaxMinCount(currentRollHistory);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <h1 className={styles.title}>Roll Away!</h1>

        {/* Dice Selection */}
        <ul className={styles.diceList}>
          {diceOptions.map((die) => (
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

        {/* Ability Check */}
        <h2 className={styles.titleHeading}>Ability Check</h2>
        <select
          onChange={(e) => setSelectedAbility(e.target.value)}
          value={selectedAbility}
          className={`${styles.selectDropdown} ${styles.selected}`}
        >
          {abilities.map((ability) => (
            <option key={ability} value={ability}>
              {ability.charAt(0).toUpperCase() + ability.slice(1)}
            </option>
          ))}
        </select>
        <button onClick={handleAbilityCheck} className={styles.button}>
          Check Ability
        </button>
        {abilityCheckResult && (
          <div>
            <p>Roll: {abilityCheckResult.roll}</p>
            <p>Modifier: {abilityCheckResult.modifier}</p>
            <p>Total: {abilityCheckResult.total}</p>
          </div>
        )}

        {/* Skill Check */}
        <h2 className={styles.titleHeading}>Skill Check</h2>
        <select
          onChange={(e) => setSelectedSkill(e.target.value)}
          value={selectedSkill}
          className={`${styles.selectDropdown} ${styles.selected}`}
        >
          {Object.keys(skills).flatMap((key) =>
            skills[key].map((skill) => (
              <option key={skill} value={skill}>
                {skill.charAt(0).toUpperCase() + skill.slice(1)}
              </option>
            ))
          )}
        </select>
        <button onClick={handleSkillCheck} className={styles.button}>
          Check Skill
        </button>
        {skillCheckResult && (
          <div>
            <p>Roll: {skillCheckResult.roll}</p>
            <p>Modifier: {skillCheckResult.modifier}</p>
            <p>Total: {skillCheckResult.total}</p>
            <p>Skill: {skillCheckResult.skill}</p>
          </div>
        )}
      </div>

      {/* Sidebar for Roll History */}
      <Sidebar
        rollHistory={currentRollHistory}
        selectedDie={selectedDie}
        setSelectedDie={setSelectedDie}
        diceOptions={diceOptions}
        maxCount={maxCount}
        minCount={minCount}
      />
    </div>
  );
};

export default RNGesus;
