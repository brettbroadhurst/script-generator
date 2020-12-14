// DocumentsView/index.tsx - Documents View
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import { IDocument } from "../../types";
import { Header, DocumentList } from "../../components";
import { Layout } from "../../components";
import { DocumentAPI } from "../../api";

// List all documents view
const DocumentsView: React.FC = () => {
  // Documents to display
  const [documents, setDocuments] = React.useState<IDocument[]>([]);

  // Get the documents from the API
  function getDocs() {
    // Get the documents from the API
    DocumentAPI.getAll()
      .then((d: IDocument[]): void => setDocuments(d))
      .catch((err) => console.error(err));
  }

  React.useEffect(() => {
    getDocs();

    const interval = setInterval(getDocs, 3000);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <Layout>
      <Header />
      {documents.length > 0 && <DocumentList documents={documents} />}
    </Layout>
  );
};

export default DocumentsView;
