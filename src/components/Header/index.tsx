// Header/index.tsx - Header Component
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Header: React.FC = () => (
  <header className={styles.header}>
    <Link to="/new">
      <button className={styles.create} type="button">
        Add Story
      </button>
    </Link>
  </header>
);

export default Header;
