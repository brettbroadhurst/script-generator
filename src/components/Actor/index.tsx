// Actor/index.tsx - Actor Component
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import styles from "./styles.module.css";
import { IActor, IPriority, IRole } from "../../types";

// Get priority from enum.
function getPriority(p: IPriority): string {
  switch (p) {
    case IPriority.Major:
      return "Major Character";
    case IPriority.Minor:
      return "Minor Character";
    case IPriority.SingleServing:
      return "Single Serving Character";
    default:
      return "Error";
  }
}

// Get role from enum.
function getRole(r: IRole): string {
  switch (r) {
    case IRole.Protagonist:
      return "Protagonist";
    case IRole.Antagonist:
      return "Antagonist";
    case IRole.Ally:
      return "Ally";
    case IRole.Neutral:
      return "Neutral";
    default:
      return "Error";
  }
}

type IProps = IActor;

// Actor component
const Actor: React.FC<IProps> = (props: IProps) => {
  const {
    id,
    documentId,
    name,
    avatar,
    role,
    priority,
    strength,
    weakness,
    virtue,
    flaw,
    desire,
    startingGoal,
    ultimateGoal,
    denoument,
    createdOn,
    updatedOn,
  } = props;

  console.log(id, documentId, createdOn, updatedOn);
  return (
    <div className={styles.actor}>
      <h1>{name}</h1>
      <img src={avatar} alt={name} />
      <p>
        <strong>Role: </strong>
        {getRole(role)}
      </p>
      <p>
        <strong>Priority: </strong>
        {getPriority(priority)}
      </p>
      <p>
        <strong>External Strength: </strong>
        {strength}
      </p>
      <p>
        <strong>External Weakness: </strong>
        {weakness}
      </p>
      <p>
        <strong>Internal Virtue: </strong>
        {virtue}
      </p>
      <p>
        <strong>Internal Flaw: </strong>
        {flaw}
      </p>
      <p>
        <strong>Primary Desire: </strong>
        {desire}
      </p>
      <p>
        <strong>Starting Goal: </strong>
        {startingGoal}
      </p>
      <p>
        <strong>Ultimate Goal: </strong>
        {ultimateGoal}
      </p>
      <p>
        <strong>Denoument: </strong>
        {denoument}
      </p>
    </div>
  );
};

export default Actor;
