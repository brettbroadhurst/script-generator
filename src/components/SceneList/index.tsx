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
};

// Scene list container
const SceneList: React.FC<IProps> = (props: IProps) => {
  const { scenes } = props;

  return (
    <div className={styles.scenes}>
      {scenes.map((s: IScene) => (
        <Scene key={s.id} {...s} />
      ))}
    </div>
  );
};

export default SceneList;
