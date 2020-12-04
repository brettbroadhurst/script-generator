// DocumentInfoView/index.tsx - Document Info View
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import styles from "./styles.module.css";
import { Layout, SceneList } from "../../components";
import { IDocument, IScene, IMedium, IFormat, IGenre } from "../../types";
import { getMedium, getFormat, getGenre } from "../../util";
import { API_ROOT } from "../../api";

type TParam = {
  docId: string;
};

interface IProps extends RouteComponentProps<TParam> {}

const DocumentInfoView: React.FC<IProps> = (props: IProps) => {
  const { match } = props;
  const { docId } = match.params;

  // Documents to display
  const [doc, setDoc] = React.useState<IDocument>();
  const [scenes, setScenes] = React.useState<IScene[]>([]);

  React.useEffect(() => {
    // Get the documents from the API
    fetch(`${API_ROOT}/documents/${docId}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setDoc(data);
        console.log(data);
      })
      .catch((err: any) => console.error(err));

    // Get the documents from the API
    fetch(`${API_ROOT}/documents/${docId}/scenes`)
      .then((res) => res.json())
      .then(({ data }) => {
        setScenes(data);
        console.log(data);
      })
      .catch((err: any) => console.error(err));
  }, []);

  // Create a new scene
  function handleCreateScene(e: any): void {
    fetch(`${API_ROOT}/documents/${docId}/scenes`, {
      method: "POST",
      body: JSON.stringify({
        title: "New Scene",
        setting: 1,
        location: "Location",
        time: "Time",
        setup: "This is a new setup",
        action: "This is a new action",
        conclusion: "This is the conclusion",
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        console.log(data);
        setScenes((prev: IScene[]) => [...prev, data]);
      })
      .catch((err) => console.error(err));
  }

  // Update the scene
  function handleUpdateScene(id: number, data: any, orig: any): void {
    console.log(data, orig);
    fetch(`${API_ROOT}/scenes/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: data.title || orig.title,
        setting: data.setting || orig.setting || 1,
        location: data.location || orig.location,
        time: data.time || orig.time,
        setup: data.setup || orig.setup,
        action: data.action || orig.action,
        conclusion: data.conclusion || orig.conclusion,
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => console.log(data))
      .catch((err) => console.error(err));
  }

  // Update the scene position
  function handleUpdateScenePosition(
    id: number,
    desired: number,
    current: number
  ): void {
    console.log(JSON.stringify({ desired, current }));
    fetch(`${API_ROOT}/scenes/${id}/position`, {
      method: "PUT",
      body: JSON.stringify({
        desired,
        current,
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => console.log(data))
      .then((err) => console.log(err));
  }

  // Update the scene
  function handleDeleteScene(id: number) {
    fetch(`${API_ROOT}/scenes/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(({ data }) => console.log(data))
      .then((err) => console.log(err));
  }

  if (doc) {
    const { title, medium, format, genre } = doc;
    return (
      <Layout>
        <div className={styles.container}>
          <h1>{title}</h1>
          <p>
            <strong>Medium: </strong>
            {getMedium(medium)}
          </p>
          <p>
            <strong>Format: </strong>
            {getFormat(format)}
          </p>
          <p>
            <strong>Genre: </strong>
            {getGenre(genre)}
          </p>
          <SceneList
            scenes={scenes}
            setScenes={setScenes}
            handleUpdate={handleUpdateScene}
            handleUpdatePosition={handleUpdateScenePosition}
            handleDelete={handleDeleteScene}
          />
          <button
            className={styles.button}
            type="submit"
            onClick={handleCreateScene}
          >
            Create New
          </button>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <h1>Could not find document</h1>
      </Layout>
    );
  }
};

export default DocumentInfoView;
