// DocumentInfoView/index.tsx - Document Info View
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import styles from "./styles.module.css";
import { Layout } from "../../components";
import { IDocument, IMedium, IFormat, IGenre } from "../../types";
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

  React.useEffect(() => {
    // Get the documents from the API
    fetch(`${API_ROOT}/documents/${docId}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setDoc(data);
        console.log(data);
      })
      .catch((err: any) => console.error(err));
  }, []);

  function getMedium(medium: IMedium): string {
    switch (medium) {
      case IMedium.None:
        return "Error";
      case IMedium.Film:
        return "Film";
      case IMedium.Television:
        return "Television";
      default:
        return "Error";
    }
  }

  function getFormat(format: IFormat): string {
    switch (format) {
      case IFormat.ShortSitcom:
        return "Short Sitcom";
      case IFormat.LongSitcom:
        return "Long Sitcom";
      case IFormat.ShortMovie:
        return "Short Movie";
      case IFormat.LongMovie:
        return "Long Movie";
      default:
        return "Error";
    }
  }

  function getGenre(genre: IGenre): string {
    switch (genre) {
      case IGenre.Drama:
        return "Drama";
      case IGenre.Horror:
        return "Horror";
      case IGenre.Comedy:
        return "Comedy";
      case IGenre.Fantasy:
        return "Fantasy";
      default:
        return "Error";
    }
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
