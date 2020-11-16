// src/index.tsx - Application Entry Point
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './styles.module.css';
import { IDocument } from './types';
import DocumentList from './containers/DocumentList';
import './index.css';

const Header: React.FC = () => (
  <header className={styles.header} />
);

const App: React.FC = () => {
  const documents: IDocument[] = [
    {
      id: '1', title: 'Document 1', createdOn: '', updatedOn: '',
    },
    {
      id: '2', title: 'Document 2', createdOn: '', updatedOn: '',
    },
    {
      id: '3', title: 'Document 3', createdOn: '', updatedOn: '',
    },
    {
      id: '4', title: 'Document 4', createdOn: '', updatedOn: '',
    },
    {
      id: '5', title: 'Document 5', createdOn: '', updatedOn: '',
    },
    {
      id: '6', title: 'Document 6', createdOn: '', updatedOn: '',
    },
    {
      id: '7', title: 'Document 7', createdOn: '', updatedOn: '',
    },
    {
      id: '8', title: 'Document 8', createdOn: '', updatedOn: '',
    },

  ];

  return (
    <div>
      <Header />
      <main>
        <DocumentList documents={documents} />
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
