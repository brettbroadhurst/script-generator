// Scene/index.tsx - Scene container
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import { IScene } from "../../types";
import styles from "./styles.module.css";

const enum ISetting {
  None = 0,
  Interior = 1,
  Exterior = 2,
}

interface IProps extends IScene {
  handleSubmit(id: number, data: any, orig: any): void;
}

interface IState {
  // Title for the scene
  title: string;

  // Setting for the scene
  setting: ISetting;

  // Location for the scene
  location: string;

  // Time for the scene
  time: string;

  // Setup for the scene
  setup: string;

  // Action for the scene
  action: string;

  // Conclusion for the scene
  conclusion: string;
}

// Scene component
const Scene: React.FC<IProps> = (props: IProps) => {
  const {
    id,
    title,
    setup,
    action,
    conclusion,
    location,
    time,
    handleSubmit,
  } = props;

  const [state, setState] = React.useState<IState>({
    title: "",
    setting: ISetting.None,
    location: "",
    time: "",
    setup: "",
    action: "",
    conclusion: "",
  });

  function handleChange(e: any): void {
    const { name, value } = e.target;
    setState((prev: IState): IState => ({ ...prev, [name]: value }));
  }

  function onSubmit(e: any): void {
    e.preventDefault();
    handleSubmit(id, state, props);
  }

  return (
    <div className={styles.scene}>
      <div className={styles.header}>
        <input
          className={styles.title}
          name="title"
          value={state.title}
          onChange={handleChange}
          placeholder={title}
        />
      </div>
      <div className={styles.meta}>
        <div>
          <select
            className={styles.input}
            name="setting"
            value={state.setting}
            onChange={handleChange}
          >
            <option value={ISetting.Interior}>INT</option>
            <option value={ISetting.Exterior}>EXT</option>
          </select>
        </div>
        <div>
          <input
            className={styles.input}
            name="location"
            value={state.location}
            onChange={handleChange}
            placeholder={location}
          />
        </div>
        <div>
          <input
            className={styles.input}
            name="time"
            value={state.time}
            onChange={handleChange}
            placeholder={time}
          />
        </div>
      </div>
      <div className={styles.views}>
        <div className={styles.toggle}>Narrative</div>
        <div className={styles.toggle}>Script</div>
      </div>
      <div>
        <div className={styles.info}>
          <label className={styles.label} htmlFor="setup">
            Setup
          </label>
          <textarea
            className={styles.textarea}
            name="setup"
            value={state.setup}
            onChange={handleChange}
            placeholder={setup}
          />
        </div>
        <div className={styles.info}>
          <label className={styles.label} htmlFor="action">
            Action
          </label>
          <textarea
            className={styles.textarea}
            name="action"
            value={state.action}
            onChange={handleChange}
            placeholder={action}
          />
        </div>
        <div className={styles.info}>
          <label className={styles.label} htmlFor="conclusion">
            Conclusion
          </label>
          <textarea
            className={styles.textarea}
            name="conclusion"
            value={state.conclusion}
            onChange={handleChange}
            placeholder={conclusion}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.button} type="submit" onClick={onSubmit}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Scene;
