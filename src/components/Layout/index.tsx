// Layout/index.tsx - Layout Component
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com
//

import * as React from "react";
import styles from "./styles.module.css";

type IProps = {
  children: React.ReactNode;
};

// Layout component wrapper
const Layout: React.FC<IProps> = (props: IProps) => {
  const { children } = props;

  return <main className={styles.main}>{children}</main>;
};

export default Layout;
