// DocumentList/index.tsx - Document List Container
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import { Link } from "react-router-dom";
import { IDocument } from "../../types";
import Document from "../../components/Document";
import styles from "./styles.module.css";

type IProps = {
  documents: IDocument[];
};

// Document list container
const DocumentList: React.FC<IProps> = (props: IProps) => {
  const { documents } = props;

  return (
    <div className={styles.documents}>
      <Link className={styles.button} to="/new">
        <p>+</p>
      </Link>

      {documents.map((d: IDocument) => (
        <Document key={d.id} {...d} />
      ))}
    </div>
  );
};

export default DocumentList;
