// Document/index.tsx - Document Component
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import styles from "./styles.module.css";
import { IDocument } from "../../types";

type IProps = IDocument;

const Document: React.FC<IProps> = (props: IProps) => {
  const { title } = props;

  return (
    <div className={styles.doc}>
      <p>{title}</p>
    </div>
  );
};

export default Document;
