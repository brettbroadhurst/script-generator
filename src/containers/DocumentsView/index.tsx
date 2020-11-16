// DocumentsView/index.tsx - Documents View
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import { IDocument } from "../../types";
import { Header, DocumentList } from "../../components";

type IProps = {
  handleAddDocument(e: any): void;
  documents: IDocument[];
};

const DocumentsView: React.FC<IProps> = (props: IProps) => {
  const { documents, handleAddDocument } = props;

  return (
    <main>
      <Header handleAddDocument={handleAddDocument} />
      <DocumentList documents={documents} />
    </main>
  );
};

export default DocumentsView;
