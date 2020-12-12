// SceneList/index.tsx - Scene List Container
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import { IScene } from "../../types";
import Scene from "../../components/Scene";
import Draggable from "../../components/Draggable";
import styles from "./styles.module.css";

type IProps = {
  scenes: IScene[];
  setScenes: any;
  handleUpdate(id: number, data: any, orig: any): void;
  handleUpdatePosition(id: number, desired: number, current: number): void;
  handleDelete(id: number): void;
};

// Scene list container
const SceneList: React.FC<IProps> = (props: IProps) => {
  const {
    scenes,
    setScenes,
    handleUpdate,
    handleUpdatePosition,
    // handleDelete,
  } = props;

  // Drag and drop state
  const [dnd, setDnd] = React.useState<any>({
    draggedFrom: 0,
    draggedTo: 0,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
  });

  // Handler for the onDragStart event.
  function handleDragStart(e: any): void {
    const initialPosition = Number(e.currentTarget.dataset.position);

    // Update the drag and drop state
    setDnd((prev: any) => ({
      ...prev,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: scenes,
    }));

    // For firefox only
    e.dataTransfer.setData("text/html", "");
  }

  // Handler for onDragOver event.
  function handleDragOver(e: any): void {
    // Cancel default events
    e.preventDefault();

    let newList: IScene[] = dnd.originalOrder;

    // index of the item being dragged
    const src = dnd.draggedFrom;

    // index of the droppable area being hovered
    const dst = Number(e.currentTarget.dataset.position);

    const itemDragged = newList[src];
    const remaining = newList.filter((_, index) => index !== src);

    newList = [
      ...remaining.slice(0, dst),
      itemDragged,
      ...remaining.slice(dst),
    ];

    if (dst !== dnd.draggedTo) {
      setDnd({
        ...dnd,
        updatedOrder: newList,
        draggedTo: dst,
      });
    }
  }

  // Handler for onDrop event.
  function handleDrop(e: any): void {
    const id = Number(e.currentTarget.dataset.position);
    setScenes(dnd.updatedOrder);
    console.log(id, dnd.draggedFrom + 1, dnd.draggedTo + 1);
    handleUpdatePosition(id, dnd.draggedFrom + 1, dnd.draggedTo + 1);

    setDnd({
      ...dnd,
      draggedFrom: 0,
      draggedTo: 0,
      isDragging: false,
    });
  }

  // Handler for onDragLeave event.
  function handleDragLeave(): void {
    setDnd({
      ...dnd,
      draggedTo: 0,
    });
  }

  return (
    <div className={styles.scenes}>
      {scenes &&
        scenes.map((s: IScene, i: number) => (
          <Draggable
            key={s.id}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            id={s.id}
            index={i}
          >
            <Scene handleSubmit={handleUpdate} {...s} />
          </Draggable>
        ))}
    </div>
  );
};

export default SceneList;
