// CreationView/index.tsx - Create View
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.css";
import { Layout } from "../../components";

enum IMedium {
  None = 0,
  Film = 1,
  Television = 2,
}

enum IFormat {
  None = 0,
  ShortSitcom = 1,
  LongSitcom = 2,
  ShortMovie = 3,
  LongMovie = 4,
  Custom = 5,
}

enum IGenre {
  None = 0,
  Drama = 1,
  Horror = 2,
  Comedy = 3,
  Fantasy = 4,
}

interface IOptionCard {
  id: string;
  name: string;
  value: any;
}

interface IOption {
  id: string;
  next: string;
  question: string;
  active: boolean;
  cards: IOptionCard[];
  handleSelect(e: any, val: any): void;
}

type IProps = {
  card: IOptionCard;
  handleSelect(e: any, value: any): void;
};

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
    name: "Drama",
    value: IGenre.Drama,
  },
  {
    id: uuidv4(),
    name: "Drama",
    value: IGenre.Drama,
  },
];

const OptionCard: React.FC<IProps> = (props: IProps) => {
  const { card, handleSelect } = props;
  const { name, value } = card;

  return (
    <div className={styles.card} onClick={(e: any) => handleSelect(e, value)}>
      <div className={styles.body}>
        <img src="#" alt="Hello Icon" />
      </div>
      <div className={styles.foot}>
        <h2>{name}</h2>
      </div>
    </div>
  );
};

// View for creating new script boilerplates
const CreationView: React.FC = () => {
  // Medium to be submitted and saved
  const [medium, setMedium] = React.useState<IMedium>(IMedium.None);

  // Format to be submitted and saved
  const [format, setFormat] = React.useState<IFormat>(IFormat.None);

  // Handler function for submitting the entered data.
  function handleSubmit(e: any): void {
    e.preventDefault();
    console.log(medium, format);
  }

  // Handler function for setting the medium when a card is selected.
  function handleSetMedium(e: any, val: any): void {
    e.preventDefault();
    console.log(val);
  }

  // Handler function for setting the format when a card is selected.
  function handleSetFormat(e: any, val: any): void {
    e.preventDefault();
    console.log(val);
  }

  function handleSetGenre(e: any, val: any): void {
    e.preventDefault();
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
    console.log(id);
    setOptions((prev: IOption[]) => {
      let nid = "";

      // Get the next ID
      prev.forEach((o: IOption) => {
        if (o.id === id) {
          nid = o.next;
        }
      });

      // Set the activity of all options
      return prev.map((o: IOption) => {
        if (nid !== "" && o.id === nid) {
          return { ...o, active: true };
        }

        return { ...o, active: false };
      });
    });
  }

  // Render out each option and every card under each option
  return (
    <Layout>
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
    </Layout>
  );
};

export default CreationView;
