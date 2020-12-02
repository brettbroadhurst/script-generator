// CreationView/index.tsx - Create View
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import { Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.css";
import { Layout, OptionCard } from "../../components";
import { IOption, IOptionCard, IMedium, IFormat, IGenre } from "../../types";
import { API_ROOT } from "../../api";

// Medium options
const mediumOpts: IOptionCard[] = [
  {
    id: uuidv4(),
    name: "Film",
    value: IMedium.Film,
  },
  {
    id: uuidv4(),
    name: "Television",
    value: IMedium.Television,
  },
];

// Format options
const formatOpts: IOptionCard[] = [
  {
    id: uuidv4(),
    name: "Short Sitcom",
    value: IFormat.ShortSitcom,
  },
  {
    id: uuidv4(),
    name: "Long Sitcom",
    value: IFormat.LongSitcom,
  },
  {
    id: uuidv4(),
    name: "Short Movie",
    value: IFormat.ShortMovie,
  },
  {
    id: uuidv4(),
    name: "Long Movie",
    value: IFormat.LongMovie,
  },
  {
    id: uuidv4(),
    name: "Custom",
    value: IFormat.Custom,
  },
];

// Genre options
const genreOpts: IOptionCard[] = [
  {
    id: uuidv4(),
    name: "Drama",
    value: IGenre.Drama,
  },
  {
    id: uuidv4(),
    name: "Horror",
    value: IGenre.Horror,
  },
  {
    id: uuidv4(),
    name: "Comedy",
    value: IGenre.Comedy,
  },
];

// View for creating new script boilerplates
const CreationView: React.FC = () => {
  // Medium to be submitted and saved
  const [medium, setMedium] = React.useState<IMedium>(IMedium.None);

  // Format to be submitted and saved
  const [format, setFormat] = React.useState<IFormat>(IFormat.None);

  // Genre to be submitted and saved
  const [genre, setGenre] = React.useState<IGenre>(IGenre.None);

  // Done submitting information
  const [done, setDone] = React.useState<boolean>(false);

  // Handler function for submitting the entered data.
  function handleSubmit(): void {
    fetch(`${API_ROOT}/documents`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Test script",
        medium,
        format,
        genre,
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => console.log(data))
      .catch((err) => console.error(err));
  }

  // Handler function for setting the medium when a card is selected.
  function handleSetMedium(e: any, val: any): void {
    e.preventDefault();
    setMedium(val);
    console.log(val);
  }

  // Handler function for setting the format when a card is selected.
  function handleSetFormat(e: any, val: any): void {
    e.preventDefault();
    setFormat(val);
    console.log(val);
  }

  function handleSetGenre(e: any, val: any): void {
    e.preventDefault();
    setGenre(val);
    console.log(val);
  }

  // Seed data
  const [options, setOptions] = React.useState<IOption[]>([
    {
      id: "1",
      next: "2",
      active: true,
      question: "What are you writing for?",
      handleSelect: handleSetMedium,
      cards: mediumOpts,
    },
    {
      id: "2",
      next: "3",
      active: false,
      question: "How many scenes are in the story",
      handleSelect: handleSetFormat,
      cards: formatOpts,
    },
    {
      id: "3",
      next: "done",
      active: false,
      question: "What genre is the story told in?",
      handleSelect: handleSetGenre,
      cards: genreOpts,
    },
  ]);

  function switcher(id: string) {
    setOptions((prev: IOption[]) => {
      let nid: string;

      // Get the next ID
      prev.forEach((o: IOption) => {
        if (o.id === id) {
          nid = o.next;
        }
      });

      // Set the activity of all options
      return prev.map((o: IOption) => {
        if (nid && o.id === nid) {
          return { ...o, active: true };
        }

        if (nid === "done") {
          setDone(true);
        }

        return { ...o, active: false };
      });
    });
  }

  React.useEffect(() => {
    if (done) {
      handleSubmit();
    }
  }, [done]);

  // Render out each option and every card under each option
  return (
    <Layout>
      {done ? (
        <Redirect to="/" />
      ) : (
        <div className={styles.container}>
          {options.map((o: IOption) => (
            <div
              key={o.id}
              className={styles.select}
              style={{ display: o.active ? "block" : "none" }}
            >
              <h2>{o.question}</h2>
              <div className={styles.options}>
                {o.cards.map((c: IOptionCard) => (
                  <OptionCard
                    key={c.id}
                    card={c}
                    handleSelect={(e: any, val: any) => {
                      o.handleSelect(e, val);
                      switcher(o.id);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default CreationView;
