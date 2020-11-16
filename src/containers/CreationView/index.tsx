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

interface IOptionCard {
  id: string;
  name: string;
  value: any;
}

interface IOption {
  id: string;
  question: string;
  cards: IOptionCard[];
  handleSelect(e: any, val: any): void;
}

type IProps = {
  card: IOptionCard;
  handleSelect(e: any, value: any): void;
};

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
    setMedium(val);
  }

  // Handler function for setting the format when a card is selected.
  function handleSetFormat(e: any, val: any): void {
    e.preventDefault();
    console.log(val);
    setFormat(val);
  }

  // Seed data
  const options: IOption[] = [
    {
      id: uuidv4(),
      question: "What are you writing for?",
      handleSelect: handleSetMedium,
      cards: [
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
      ],
    },
    {
      id: uuidv4(),
      question: "How many scenes are in the story",
      handleSelect: handleSetFormat,
      cards: [
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
      ],
    },
  ];

  // Render out each option and every card under each option
  return (
    <Layout>
      <div className={styles.container}>
        {options.map((o: IOption) => (
          <div key={o.id} className={styles.select}>
            <h2>{o.question}</h2>
            <div className={styles.options}>
              {o.cards.map((c: IOptionCard) => (
                <OptionCard key={c.id} card={c} handleSelect={o.handleSelect} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default CreationView;
