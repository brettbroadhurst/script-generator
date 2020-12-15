// ActorForm/index.tsx - Actor Form Component
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import styles from "./styles.module.css";
import { IPriority, IRole } from "../../types";

type IProps = {
  handleCreateActor(e: any): void;
  handleToggleModal(e: any): void;
};

// Character data
interface IState {
  name: string;
  avatar: string;
  role: IRole;
  priority: IPriority;
  strength: string;
  weakness: string;
  virtue: string;
  flaw: string;
  desire: string;
  startingGoal: string;
  ultimateGoal: string;
  denoument: string;
}

// Form component for creating actors
const ActorForm: React.FC<IProps> = (props: IProps) => {
  const { handleCreateActor, handleToggleModal } = props;
  const [state, setState] = React.useState<IState>({
    name: "",
    avatar: "",
    role: 1,
    priority: 1,
    strength: "",
    weakness: "",
    virtue: "",
    flaw: "",
    desire: "",
    startingGoal: "",
    ultimateGoal: "",
    denoument: "",
  });

  // Handle changes to state when inputs change.
  function handleChange(e: any): void {
    const { value } = e.target;
    setState((prev: IState) => ({ ...prev, [e.target.name]: value }));
  }

  // Handle submission of the form.
  function handleSubmit(e: any): void {
    e.preventDefault();
    handleCreateActor(state);
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal} onClick={handleToggleModal}></div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.header}>Create Actor</h2>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          className={styles.input}
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="John Doe"
        />

        <label className={styles.label} htmlFor="avatar">
          Avatar
        </label>
        <input
          className={styles.input}
          name="avatar"
          value={state.avatar}
          onChange={handleChange}
          placeholder="Image should be here"
        />

        <label className={styles.label} htmlFor="role">
          Role
        </label>
        <select
          className={styles.input}
          name="role"
          value={state.role}
          onChange={handleChange}
        >
          <option value={IRole.Protagonist}>Protagonist</option>
          <option value={IRole.Antagonist}>Antagonist</option>
          <option value={IRole.Ally}>Ally</option>
          <option value={IRole.Neutral}>Neutral</option>
        </select>

        <label className={styles.label} htmlFor="priority">
          Priority
        </label>
        <select
          className={styles.input}
          name="priority"
          value={state.priority}
          onChange={handleChange}
        >
          <option value={IPriority.Major}>Major Character</option>
          <option value={IPriority.Minor}>Minor Character</option>
          <option value={IPriority.SingleServing}>
            Single-Serving Character
          </option>
        </select>

        <label className={styles.label} htmlFor="strength">
          External Strength
        </label>
        <input
          className={styles.input}
          name="strength"
          value={state.strength}
          onChange={handleChange}
          placeholder="External strength to the character"
        />

        <label className={styles.label} htmlFor="weakness">
          External Weakness
        </label>
        <input
          className={styles.input}
          name="weakness"
          value={state.weakness}
          onChange={handleChange}
          placeholder="External weakness to the character"
        />

        <label className={styles.label} htmlFor="virtue">
          Internal Virtue
        </label>
        <input
          className={styles.input}
          name="virtue"
          value={state.virtue}
          onChange={handleChange}
          placeholder="Internal virtue of the character"
        />

        <label className={styles.label} htmlFor="flaw">
          Internal Flaw
        </label>
        <input
          className={styles.input}
          name="flaw"
          value={state.flaw}
          onChange={handleChange}
          placeholder="Internal flaw of the character"
        />

        <label className={styles.label} htmlFor="desire">
          Primary Desire
        </label>
        <input
          className={styles.input}
          name="desire"
          value={state.desire}
          onChange={handleChange}
          placeholder="Character's primary desire"
        />

        <label className={styles.label} htmlFor="startingGoal">
          Starting Goal
        </label>
        <input
          className={styles.input}
          name="startingGoal"
          value={state.startingGoal}
          onChange={handleChange}
          placeholder="Starting goal of the character"
        />

        <label className={styles.label} htmlFor="ultimateGoal">
          Ultimate Goal
        </label>
        <input
          className={styles.input}
          name="ultimateGoal"
          value={state.ultimateGoal}
          onChange={handleChange}
          placeholder="Ultimate goal of the character"
        />

        <label className={styles.label} htmlFor="denoument">
          Denoument
        </label>
        <input
          className={styles.input}
          name="denoument"
          value={state.denoument}
          onChange={handleChange}
          placeholder="The final state of the charater is..."
        />

        <button className={styles.button} type="submit">
          Create Actor
        </button>
      </form>
    </div>
  );
};

export default ActorForm;
