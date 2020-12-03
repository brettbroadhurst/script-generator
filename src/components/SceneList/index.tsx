// SceneList/index.tsx - Scene List Container
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import { IScene } from "../../types";
import Scene from "../../components/Scene";
import styles from "./styles.module.css";

type IProps = {
  scenes: IScene[];
  handleSubmit(id: number, data: any): void;
};

// Scene list container
const SceneList: React.FC<IProps> = (props: IProps) => {
  const { scenes, handleSubmit } = props;

  return (
    <div className={styles.scenes}>
      {scenes.map((s: IScene) => (
        <Scene key={s.id} handleSubmit={handleSubmit} {...s} />
      ))}
    </div>
  );
};

export default SceneList;
