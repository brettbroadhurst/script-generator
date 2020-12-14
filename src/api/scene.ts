// api/scene.ts - API
//

import { API_ROOT } from "./root";
import { IScene } from "../types";

// Class for handling actions to the API for Scenes
export default class SceneAPI {
  // Get all scenes by a document id.
  public static async getAll(docId: number): Promise<IScene[]> {
    try {
      const res = await fetch(`${API_ROOT}/documents/${docId}/scenes`);
      const { data } = await res.json();

      return data;
    } catch (err) {
      return [];
    }
  }

  // Get a scene by its id.
  public static async getOne(sceneId: number): Promise<IScene> {
    try {
      const res = await fetch(`${API_ROOT}/scenes/${sceneId}`);
      const { data } = await res.json();

      return data;
    } catch (err) {
      return err;
    }
  }

  // Create a new scene.
  public static async create(docId: number, actor: any) {
    try {
      const res = await fetch(`${API_ROOT}/documents/${docId}/scenes`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: actor.title,
          setting: actor.setting,
          location: actor.location,
          time: actor.time,
          setup: actor.setup,
          action: actor.action,
          conclusion: actor.conclusion,
        }),
      });

      const { data } = await res.json();

      return data;
    } catch (err) {
      return err;
    }
  }

  // Update a scene.
  public static async update(
    sceneId: number,
    scene: any,
    orig: any
  ): Promise<any> {
    try {
      const res = await fetch(`${API_ROOT}/scenes/${sceneId}`, {
        method: "PUT",
        body: JSON.stringify({
          title: scene.title || orig.title,
          setting: scene.setting || orig.setting || 1,
          location: scene.location || orig.location,
          time: scene.time || orig.time,
          setup: scene.setup || orig.setup,
          action: scene.action || orig.action,
          conclusion: scene.conclusion || orig.conclusion,
        }),
      });

      const { data } = await res.json();

      return data;
    } catch (err) {
      return err;
    }
  }

  // Update the scene position
  public static async updatePosition(
    sceneId: number,
    desired: number,
    current: number
  ) {
    try {
      const res = await fetch(`${API_ROOT}/scenes/${sceneId}/position`, {
        method: "PUT",
        body: JSON.stringify({
          desired,
          current,
        }),
      });

      const { data } = res.json();

      return data;
    } catch (err) {
      return err;
    }
  }

  // Delete a scene.
  public static async delete(sceneId: number): Promise<any> {
    try {
      const res = await fetch(`${API_ROOT}/scenes/${sceneId}`, {
        method: "DELETE",
      });

      const { data } = res.json();

      return data;
    } catch (err) {
      return err;
    }
  }
}
