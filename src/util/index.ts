// util/index.ts - All utility functions
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import { IMedium, IFormat, IGenre } from "../types";

export function getMedium(medium: IMedium): string {
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

export function getFormat(format: IFormat): string {
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

export function getGenre(genre: IGenre): string {
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
