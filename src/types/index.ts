// types/index.ts - All global type definitions
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

export const enum IMedium {
  None = 0,
  Film = 1,
  Television = 2,
}
export const enum IFormat {
  None = 0,
  ShortSitcom = 1,
  LongSitcom = 2,
  ShortMovie = 3,
  LongMovie = 4,
  Custom = 5,
}

export const enum IGenre {
  None = 0,
  Drama = 1,
  Horror = 2,
  Comedy = 3,
  Fantasy = 4,
}

export interface IDocument {
  id: string;
  title: string;
  medium: IMedium;
  format: IFormat;
  genre: IGenre;
  createdOn: string;
  updatedOn: string;
}

export interface IScene {
  id: number;
  docId: number;
  title: string;
  setting: number;
  location: string;
  time: string;
  setup: string;
  action: string;
  conclusion: string;
  createdOn: string;
  updatedOn: string;
}

export interface IOptionCard {
  id: string;
  name: string;
  value: any;
}

export interface IOption {
  id: string;
  next: string;
  question: string;
  active: boolean;
  cards: IOptionCard[];
  handleSelect(e: any, val: any): void;
}

// Actor Role Enum
export const enum IRole {
  // None indicates an error
  None = 0,
  Protagonist = 1,
  Antagonist = 2,
  Ally = 3,
  Neutral = 4,
}

// Actor Priority Enum
export const enum IPriority {
  // None indicates an error
  None = 0,
  Major = 1,
  Minor = 2,
  SingleServing = 3,
}

// Character data
export interface IActor {
  id: number;
  documentId: number;
  name: string;
  avatar: string;
  role: IRole;
  priority: IPriority;
  strength: string;
  weakness: string;
  virtue: string;
  flaw: string;
  desire: string;
  startingGoal: string;
  ultimateGoal: string;
  denoument: string;
  createdOn: string;
  updatedOn: string;
}
