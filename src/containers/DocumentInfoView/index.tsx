// DocumentInfoView/index.tsx - Document Info View
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import styles from "./styles.module.css";
import { Layout, SceneList, ActorList, ActorForm } from "../../components";
import { IDocument, IScene, IActor } from "../../types";
import { getMedium, getFormat, getGenre } from "../../util";
import { ActorAPI, DocumentAPI, SceneAPI } from "../../api";

type TParam = {
  docId: string;
};

interface IProps extends RouteComponentProps<TParam> {}

const DocumentInfoView: React.FC<IProps> = (props: IProps) => {
  const { match } = props;
  const { docId } = match.params;

  // Documents to display
  const [doc, setDoc] = React.useState<IDocument>();

  // Scenes in the document
  const [scenes, setScenes] = React.useState<IScene[]>([]);
  // Actors in the document
  const [actors, setActors] = React.useState<IActor[]>([]);

  // Actor modal visibility
  const [actorModal, setActorModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Get the documents from the API
    DocumentAPI.getOne(Number(docId))
      .then((d: IDocument): void => setDoc(d))
      .catch((err) => console.error(err));

    SceneAPI.getAll(Number(docId))
      .then((s: IScene[]): void => setScenes(s))
      .catch((err) => console.error(err));

    ActorAPI.getAll(Number(docId))
      .then((a: IActor[]): void => setActors(a))
      .catch((err) => console.error(err));
  }, []);

  // Create a new actor
  function handleCreateActor(data: any): void {
    ActorAPI.create(Number(docId), data)
      .then((a: IActor): void => setActors((prev: IActor[]) => [...prev, a]))
      .catch((err) => console.error(err));
  }

  // Create a new scene
  function handleCreateScene(data: any): void {
    SceneAPI.create(Number(docId), data)
      .then((s: IScene): void => setScenes((prev: IScene[]) => [...prev, s]))
      .catch((err) => console.error(err));
  }

  // Update the scene
  function handleUpdateScene(id: number, data: any, orig: any): void {
    SceneAPI.update(id, data, orig)
      .then((msg: any): void => console.log(msg))
      .catch((err) => console.error(err));
  }

  // Update the scene position
  function handleUpdateScenePosition(
    id: number,
    desired: number,
    current: number
  ): void {
    SceneAPI.updatePosition(id, desired, current)
      .then((msg: any): void => console.log(msg))
      .then((err) => console.log(err));
  }

  // Update the scene
  function handleDeleteScene(id: number) {
    SceneAPI.delete(id)
      .then((msg: any): void => console.log(msg))
      .then((err) => console.log(err));
  }

  // Toggle Modal visible for Actor creation
  function toggleActorModal(e: any): void {
    e.preventDefault();
    setActorModal((prev: boolean): boolean => !prev);
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
          <div>
            <ActorList actors={actors} />
            <button
              className={styles.button}
              type="button"
              onClick={toggleActorModal}
            >
              Create New
            </button>
            {actorModal && <ActorForm handleCreateActor={handleCreateActor} />}
          </div>
          <div>
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
