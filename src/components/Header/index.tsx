// Header/index.tsx - Header Component
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import styles from "./styles.module.css";

type IProps = {
  handleAddDocument(e: any): void;
};

const Header: React.FC<IProps> = (props: IProps) => {
  const { handleAddDocument } = props;
  return (
    <header className={styles.header}>
      <button
        className={styles.create}
        type="button"
        onClick={handleAddDocument}
      >
        Add Story
      </button>
    </header>
  );
};

export default Header;
