// SceneForm/index.tsx - Scene Form Component
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import styles from "./styles.module.css";
import { ISetting } from "../../types";

type IProps = {
  docId: string;
  handleCreateScene(data: any, state: any, props: any): void;
  handleToggleModal(e: any): void;
};

interface IState {
  title: string;
  setting: ISetting;
  location: string;
  time: string;
  setup: string;
  action: string;
  conclusion: string;
}

// Form component for creating scenes
const SceneForm: React.FC<IProps> = (props: IProps) => {
  const { docId, handleCreateScene, handleToggleModal } = props;

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
    handleCreateScene(docId, state, props);
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal} onClick={handleToggleModal}></div>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className={styles.header}>Create Scene</h2>
        <label className={styles.label} htmlFor="title">
          Title
        </label>
        <input
          className={styles.input}
          name="title"
          value={state.title}
          onChange={handleChange}
          placeholder="Your great scene"
        />

        <label className={styles.label} htmlFor="setting">
          Setting
        </label>
        <select
          className={styles.input}
          name="setting"
          value={state.setting}
          onChange={handleChange}
        >
          <option value={ISetting.Interior}>INT</option>
          <option value={ISetting.Exterior}>EXT</option>
        </select>

        <label className={styles.label} htmlFor="location">
          Location
        </label>
        <input
          className={styles.input}
          name="location"
          value={state.location}
          onChange={handleChange}
          placeholder="Location of the scene"
        />

        <label className={styles.label} htmlFor="time">
          Time
        </label>
        <input
          className={styles.input}
          name="time"
          value={state.time}
          onChange={handleChange}
          placeholder="Time of day"
        />

        <label className={styles.label} htmlFor="setup">
          Setup
        </label>
        <textarea
          className={styles.textarea}
          name="setup"
          value={state.setup}
          onChange={handleChange}
          placeholder="The setup to the scene..."
        />

        <label className={styles.label} htmlFor="action">
          Action
        </label>
        <textarea
          className={styles.textarea}
          name="action"
          value={state.action}
          onChange={handleChange}
          placeholder="The action to the scene..."
        />

        <label className={styles.label} htmlFor="conclusion">
          Conclusion
        </label>
        <textarea
          className={styles.textarea}
          name="conclusion"
          value={state.conclusion}
          onChange={handleChange}
          placeholder="The conclusion to the scene..."
        />
        <button className={styles.button} type="submit">
          Create Scene
        </button>
      </form>
    </div>
  );
};

export default SceneForm;
