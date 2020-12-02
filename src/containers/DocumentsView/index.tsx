// DocumentsView/index.tsx - Documents View
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import { IDocument } from "../../types";
import { Header, DocumentList } from "../../components";
import { Layout } from "../../components";
import { API_ROOT } from "../../api";

// List all documents view
const DocumentsView: React.FC = () => {
  // Documents to display
  const [documents, setDocuments] = React.useState<IDocument[]>([]);

  React.useEffect(() => {
    // Get the documents from the API
    function getDocs() {
      fetch(`${API_ROOT}/documents`)
        .then((res) => res.json())
        .then(({ data }) => {
          setDocuments(data);
        })
        .catch((err: any) => console.error(err));
    }

    getDocs();

    let interval = setInterval(getDocs, 3000);

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
