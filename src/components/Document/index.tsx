// Document/index.tsx - Document Component
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { IDocument } from "../../types";

type IProps = IDocument;

const Document: React.FC<IProps> = (props: IProps) => {
  const { id, title } = props;

  return (
    <Link to={`/documents/${id}`}>
      <div className={styles.doc}>
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default Document;
