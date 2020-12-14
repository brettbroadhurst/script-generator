// ActorForm/index.tsx - Actor Form Component
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import styles from "./styles.module.css";
import { IPriority, IRole } from "../../types";

type IProps = {
  handleCreateActor(e: any): void;
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
  const { handleCreateActor } = props;
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
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input name="name" value={state.name} onChange={handleChange} />

        <label htmlFor="avatar">Avatar: </label>
        <input name="avatar" value={state.avatar} onChange={handleChange} />

        <label htmlFor="role">Role: </label>
        <select name="role" value={state.role} onChange={handleChange}>
          <option value={IRole.Protagonist}>Protagonist</option>
          <option value={IRole.Antagonist}>Antagonist</option>
          <option value={IRole.Ally}>Ally</option>
          <option value={IRole.Neutral}>Neutral</option>
        </select>

        <label htmlFor="priority">Priority: </label>
        <select name="priority" value={state.priority} onChange={handleChange}>
          <option value={IPriority.Major}>Major Character</option>
          <option value={IPriority.Minor}>Minor Character</option>
          <option value={IPriority.SingleServing}>
            Single-Serving Character
          </option>
        </select>

        <label htmlFor="strength">External Strength: </label>
        <input name="strength" value={state.strength} onChange={handleChange} />

        <label htmlFor="weakness">External Weakness: </label>
        <input name="weakness" value={state.weakness} onChange={handleChange} />

        <label htmlFor="virtue">Internal Virtue: </label>
        <input name="virtue" value={state.virtue} onChange={handleChange} />

        <label htmlFor="flaw">Internal Flaw: </label>
        <input name="flaw" value={state.flaw} onChange={handleChange} />

        <label htmlFor="desire">Primary Desire: </label>
        <input name="desire" value={state.desire} onChange={handleChange} />

        <label htmlFor="startingGoal">Starting Goal: </label>
        <input
          name="startingGoal"
          value={state.startingGoal}
          onChange={handleChange}
        />

        <label htmlFor="ultimateGoal">Ultimate Goal: </label>
        <input
          name="ultimateGoal"
          value={state.ultimateGoal}
          onChange={handleChange}
        />

        <label htmlFor="denoument">Denoument: </label>
        <input
          name="denoument"
          value={state.denoument}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default ActorForm;
