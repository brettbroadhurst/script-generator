// Scene/index.tsx - Scene container
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import { IScene } from "../../types";
import styles from "./styles.module.css";

type IProps = IScene;

const enum Setting {
  None = 0,
  Interior = 1,
  Exterior = 2,
}

// Scene component
const Scene: React.FC<IProps> = (props: IProps) => {
  const { title, setup, action, conclusion, location, time } = props;

  // Title for the scene
  const [newTitle, setNewTitle] = React.useState<string>("");

  // Setting for the scene
  const [newSetting, setNewSetting] = React.useState<string>(Setting.None);

  // Location for the scene
  const [newLocation, setNewLocation] = React.useState<string>("");

  // Time for the scene
  const [newTime, setNewTime] = React.useState<string>("");

  // Setup for the scene
  const [newSetup, setNewSetup] = React.useState<string>("");

  // Action for the scene
  const [newAction, setNewAction] = React.useState<string>("");

  // Conclusion for the scene
  const [newConclusion, setNewConclusion] = React.useState<string>("");

  return (
    <div className={styles.scene}>
      <div className={styles.header}>
        <input
          className={styles.title}
          value={newTitle}
          onChange={(e: any) => setNewTitle(e.target.value)}
          placeholder={title}
        />
      </div>
      <div className={styles.meta}>
        <div>
          <select
            className={styles.input}
            value={newSetting}
            onChange={(e: any) => setNewSetting(e.target.value)}
          >
            <option value={Setting.Interior}>INT</option>
            <option value={Setting.Exterior}>EXT</option>
          </select>
        </div>
        <div>
          <input
            className={styles.input}
            value={newLocation}
            onChange={(e: any) => setNewLocation(e.target.value)}
            placeholder={location}
          />
        </div>
        <div>
          <input
            className={styles.input}
            value={newTime}
            onChange={(e: any) => setNewTime(e.target.value)}
            placeholder={time}
          />
        </div>
      </div>
      <div>
        <div className={styles.info}>
          <label className={styles.label} htmlFor="setup">
            Setup
          </label>
          <textarea
            className={styles.textarea}
            name="setup"
            value={newSetup}
            onChange={(e: any) => setNewSetup(e.target.value)}
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
            value={newAction}
            onChange={(e: any) => setNewAction(e.target.value)}
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
            value={newConclusion}
            onChange={(e: any) => setNewConclusion(e.target.value)}
            placeholder={conclusion}
          />
        </div>
      </div>
    </div>
  );
};

export default Scene;
