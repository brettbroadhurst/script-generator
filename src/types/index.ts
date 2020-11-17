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
