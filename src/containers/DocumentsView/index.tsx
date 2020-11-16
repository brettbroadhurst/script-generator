// DocumentsView/index.tsx - Documents View
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import { IDocument } from "../../types";
import { Header, DocumentList } from "../../components";
import { Layout } from "../../components";

type IProps = {
  handleAddDocument(e: any): void;
  documents: IDocument[];
};

// List all documents view
const DocumentsView: React.FC<IProps> = (props: IProps) => {
  const { documents, handleAddDocument } = props;

  return (
    <Layout>
      <Header handleAddDocument={handleAddDocument} />
      <DocumentList documents={documents} />
    </Layout>
  );
};

export default DocumentsView;
