//
//
//
//

import * as React from "react";
import styles from "./styles.module.css";
import { IOptionCard } from "../../types";

type IProps = {
  card: IOptionCard;
  handleSelect(e: any, value: any): void;
};

const OptionCard: React.FC<IProps> = (props: IProps) => {
  const { card, handleSelect } = props;
  const { name, value } = card;

  return (
    <div className={styles.card} onClick={(e: any) => handleSelect(e, value)}>
      <div className={styles.body}>
        <img src="#" alt="Icon will go here" />
      </div>
      <div className={styles.foot}>
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default OptionCard;
