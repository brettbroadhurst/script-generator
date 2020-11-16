// src/index.tsx - Application Entry Point
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IDocument } from "./types";
import { DocumentsView } from "./containers";
import "./index.css";

const docs: IDocument[] = [
  {
    id: uuidv4(),
    title: "Document 1",
    createdOn: "",
    updatedOn: "",
  },
  {
    id: uuidv4(),
    title: "Document 2",
    createdOn: "",
    updatedOn: "",
  },
  {
    id: uuidv4(),
    title: "Document 3",
    createdOn: "",
    updatedOn: "",
  },
  {
    id: uuidv4(),
    title: "Document 4",
    createdOn: "",
    updatedOn: "",
  },
  {
    id: uuidv4(),
    title: "Document 5",
    createdOn: "",
    updatedOn: "",
  },
  {
    id: uuidv4(),
    title: "Document 6",
    createdOn: "",
    updatedOn: "",
  },
  {
    id: uuidv4(),
    title: "Document 7",
    createdOn: "",
    updatedOn: "",
  },
  {
    id: uuidv4(),
    title: "Document 8",
    createdOn: "",
    updatedOn: "",
  },
];

const App: React.FC = () => {
  const [documents, setDocuments] = React.useState<IDocument[]>(docs);

  function handleAddDocument(e: any) {
    e.preventDefault();

    setDocuments((prev: IDocument[]) => [
      ...prev,
      {
        id: uuidv4(),
        title: "New Document",
        createdOn: new Date().toDateString(),
        updatedOn: new Date().toDateString(),
      },
    ]);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <DocumentsView
              documents={documents}
              handleAddDocument={handleAddDocument}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
