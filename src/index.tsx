// src/index.tsx - Application Entry Point
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CreationView, DocumentsView, DocumentInfoView } from "./containers";
import "./index.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={DocumentsView} />
        <Route exact path="/new" component={CreationView} />
        <Route path="/documents/:docId" component={DocumentInfoView} />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
