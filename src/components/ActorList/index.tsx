// ActorList/index.tsx - Actor List Component
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import styles from "./styles.module.css";
import { IActor } from "../../types";
import Actor from "../Actor";

type IProps = {
  actors: IActor[];
};

// Container for listing out the actors of a document.
const ActorList: React.FC<IProps> = (props: IProps) => {
  const { actors } = props;
  return (
    <div className={styles.actors}>
      {actors && actors.map((a: IActor) => <Actor key={a.id} {...a} />)}
    </div>
  );
};

export default ActorList;
