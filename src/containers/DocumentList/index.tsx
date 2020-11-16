// DocumentList/index.tsx - Document List Container
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from 'react';
import { IDocument } from '../../types';
import Document from '../../components/Document';
import styles from './styles.module.css';

type Props = {
    documents: IDocument;
};

// Document list container
const DocumentList: React.FC<Props> = (props: Props) => {
  const { documents } = props;

  return (
    <div className={styles.documents}>
      {documents.map((d: IDocument) => (
        <Document key={d.id} {...d} />
      ))}
    </div>
  );
};

export default DocumentList;
