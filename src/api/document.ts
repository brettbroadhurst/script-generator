// api/document.ts - API
//

import { API_ROOT } from "./root";
import { IDocument } from "../types";

// Class for handling actions to the API for Documents
export default class DocumentAPI {
  // Get the documents from the API
  public static async getAll(): Promise<IDocument[]> {
    try {
      const res = await fetch(`${API_ROOT}/documents`);
      const { data } = await res.json();

      return data;
    } catch (err) {
      return err;
    }
  }

  // Get one document from the API
  public static async getOne(id: number): Promise<IDocument> {
    try {
      const res = await fetch(`${API_ROOT}/documents/${id}`);
      const { data } = await res.json();

      return data;
    } catch (err) {
      return err;
    }
  }

  // Create a new document
  public static async create(doc: any): Promise<IDocument> {
    try {
      const res = await fetch(`${API_ROOT}/documents`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: doc.title,
          medium: doc.medium,
          format: doc.format,
          genre: doc.genre,
        }),
      });
      const { data } = await res.json();

      return data;
    } catch (err) {
      return err;
    }
  }
}
