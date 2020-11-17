// src/index.tsx - Application Entry Point
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IDocument, IMedium, IFormat, IGenre } from "./types";
import { CreationView, DocumentsView } from "./containers";
import "./index.css";

const docs: IDocument[] = [
  {
    id: uuidv4(),
    title: "Document 1",
    medium: IMedium.Film,
    format: IFormat.LongMovie,
    genre: IGenre.Horror,
    createdOn: "",
    updatedOn: "",
  },
];

const App: React.FC = () => {
  const [documents, setDocuments] = React.useState<IDocument[]>(docs);

  function handleAddDocument(medium: IMedium, format: IFormat, genre: IGenre) {
    setDocuments((prev: IDocument[]) => [
      ...prev,
      {
        id: uuidv4(),
        title: "New Document",
        medium,
        format,
        genre,
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
          render={() => <DocumentsView documents={documents} />}
        />
        <Route
          exact
          path="/new"
          render={() => <CreationView handleAddDocument={handleAddDocument} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
