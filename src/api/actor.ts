// api/actor.ts - API
//

import { API_ROOT } from "./root";
import { IActor } from "../types";

// Class for handling actions to the API for Actors
export default class ActorAPI {
  // Get all actors by a document id.
  public static async getAll(docId: number): Promise<IActor[]> {
    try {
      const res = await fetch(`${API_ROOT}/documents/${docId}/actors`);
      const { data } = await res.json();

      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  // Get an actor by its id.
  public static async getOne(actorId: number): Promise<IActor | null> {
    try {
      const res = await fetch(`${API_ROOT}/actors/${actorId}`);
      const { data } = await res.json();

      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // Create a new actor
  public static async create(docId: number, actor: any): Promise<IActor> {
    try {
      const res = await fetch(`${API_ROOT}/documents/${docId}/actors`, {
        method: "POST",
        body: JSON.stringify({
          name: actor.name,
          avatar: actor.avatar,
          role: actor.role,
          priority: actor.priority,
          strength: actor.strength,
          weakness: actor.weakness,
          virtue: actor.virtue,
          flaw: actor.flaw,
          desire: actor.desire,
          startingGoal: actor.startingGoal,
          ultimateGoal: actor.ultimateGoal,
          denoument: actor.denoument,
        }),
      });

      const { data } = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  }
}
