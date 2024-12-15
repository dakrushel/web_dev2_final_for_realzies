import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import styles from './RNGesus.module.css';
import { useUser } from './UserContext';
import { logRoll, fetchRollHistory } from "../api/rollsApi";

const RNGesus = () => {
  const { user } = useUser();
  const [rollResult, setRollResult] = useState(null);
  const [selectedDie, setSelectedDie] = useState('d20');
  const [rollMode, setRollMode] = useState('neutral');
  const [otherRoll, setOtherRoll] = useState(null);
  const [rollHistories, setRollHistories] = useState({
    d4: [], d6: [], d8: [], d10: [], d12: [], d20: [], d100: []
  });
  const [selectedAbility, setSelectedAbility] = useState('strength');
  const [abilityCheckResult, setAbilityCheckResult] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [skillCheckResult, setSkillCheckResult] = useState(null);
  const [minCount, setMinCount] = useState(0);
  const [maxCount, setMaxCount] = useState(0);

  useEffect(() => {
    const loadRollHistory = async () => {
      if (user?.id) {
        try {
          const data = await fetchRollHistory();
          if (Array.isArray(data)) {
            const newHistories = {
              d4: [], d6: [], d8: [], d10: [], d12: [], d20: [], d100: []
            };

            data.forEach((roll) => {
              if (newHistories[roll.rollType]) {
                newHistories[roll.rollType].push({
                  result: roll.result,
                  sides: parseInt(roll.rollType.slice(1), 10)
                });
              }
            });

            setRollHistories(newHistories);
          }
        } catch (err) {
          console.error('Error fetching roll history:', err.message);
        }
      }
    };

    loadRollHistory();
  }, [user?.id]);

  const diceOptions = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];
  const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

  const skills = {
    strength: ['athletics'],
    dexterity: ['acrobatics', 'sleight-of-hand', 'stealth'],
    constitution: [],
    intelligence: ['arcana', 'history', 'investigation', 'nature', 'religion'],
    wisdom: ['animal handling', 'insight', 'medicine', 'perception', 'survival'],
    charisma: ['deception', 'intimidation', 'performance', 'persuasion']
  };

  const rollEm = (sides) => Math.floor(Math.random() * sides) + 1;

  const handleRoll = async () => {
    const sides = parseInt(selectedDie.slice(1), 10);
    let result;

    if (rollMode === 'advantage') {
      const roll1 = rollEm(sides);
      const roll2 = rollEm(sides);
      result = Math.max(roll1, roll2);
      setOtherRoll({ roll1, roll2, mode: 'Advantage', selected: result });
    } else if (rollMode === 'disadvantage') {
      const roll1 = rollEm(sides);
      const roll2 = rollEm(sides);
      result = Math.min(roll1, roll2);
      setOtherRoll({ roll1, roll2, mode: 'Disadvantage', selected: result });
    } else {
      result = rollEm(sides);
      setOtherRoll(null);
    }

    setRollResult(result);

    if (result === sides) setMaxCount((prev) => prev + 1);
    if (result === 1) setMinCount((prev) => prev + 1);

    if (user?.id) {
      try {
        await logRoll(selectedDie, result);
        setRollHistories((prev) => ({
          ...prev,
          [selectedDie]: [{ result, sides }, ...prev[selectedDie]].slice(0, 10)
        }));
      } catch (err) {
        console.error('Error saving roll:', err.message);
      }
    }
  };

  const handleAbilityCheck = () => {
    const sides = 20;
    const roll = rollEm(sides);
    const modifiers = {
      strength: 2,
      dexterity: 3,
      constitution: 1,
      intelligence: 4,
      wisdom: 5,
      charisma: 6
    };

    const modifier = modifiers[selectedAbility] || 0;
    const total = roll + modifier;

    setAbilityCheckResult({ roll, modifier, total });
    setSkillCheckResult(null);
  };

  const handleSkillCheck = () => {
    const sides = 20;
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
      persuasion: 2
    };

    const modifier = modifiers[selectedSkill] || 0;
    const total = roll + modifier;

    setSkillCheckResult({ roll, modifier, total, skill: selectedSkill });
    setAbilityCheckResult(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <h1>Roll Away!</h1>

        <button onClick={handleRoll} className={styles.button}>
          Roll
        </button>

        {rollResult && <p>Roll: {selectedDie} = {rollResult}</p>}

        {otherRoll && (
          <p>{otherRoll.mode}: Roll 1={otherRoll.roll1}, Roll 2={otherRoll.roll2}, Result={otherRoll.selected}</p>
        )}

        <button onClick={handleAbilityCheck} className={styles.button}>
          Ability Check ({selectedAbility})
        </button>

        {abilityCheckResult && (
          <p>Roll: {abilityCheckResult.roll}, Modifier: {abilityCheckResult.modifier}, Total: {abilityCheckResult.total}</p>
        )}

        <button onClick={handleSkillCheck} className={styles.button}>
          Skill Check ({selectedSkill})
        </button>

        {skillCheckResult && (
          <p>Roll: {skillCheckResult.roll}, Modifier: {skillCheckResult.modifier}, Total: {skillCheckResult.total}</p>
        )}

        <Sidebar
          rollHistory={rollHistories[selectedDie]}
          selectedDie={selectedDie}
          setSelectedDie={setSelectedDie}
          diceOptions={diceOptions}
          minCount={minCount}
          maxCount={maxCount}
        />
      </div>
    </div>
  );
};

export default RNGesus;
