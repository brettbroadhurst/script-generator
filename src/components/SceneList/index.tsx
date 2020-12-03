// SceneList/index.tsx - Scene List Container
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";
import { IScene } from "../../types";
import Scene from "../../components/Scene";
import styles from "./styles.module.css";

type IProps = {
  scenes: IScene[];
  setScenes: any;
  handleSubmit(id: number, data: any): void;
};

type IProps2 = {
  index: number;
  children: React.ReactNode;
  onDragStart(e: any): void;
  onDragOver(e: any): void;
  onDrop(): void;
  onDragLeave(): void;
};

const Draggable: React.FC<IProps2> = (props: IProps2) => {
  const {
    index,
    onDragStart,
    onDragOver,
    onDrop,
    onDragLeave,
    children,
  } = props;
  return (
    <div
      className={styles.draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      draggable="true"
      data-position={index}
    >
      {children}
    </div>
  );
};

// Scene list container
const SceneList: React.FC<IProps> = (props: IProps) => {
  const { scenes, setScenes, handleSubmit } = props;

  // Drag and drop state
  const [dnd, setDnd] = React.useState({
    draggedFrom: null,
    draggedTo: null,
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
  function handleDrop(): void {
    setScenes(dnd.updatedOrder);
    console.log(dnd.draggedFrom, dnd.draggedTo);

    setDnd({
      ...dnd,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  }

  // Handler for onDragLeave event.
  function handleDragLeave(): void {
    setDnd({
      ...dnd,
      draggedTo: null,
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
            index={i}
          >
            <Scene handleSubmit={handleSubmit} {...s} />
          </Draggable>
        ))}
    </div>
  );
};

export default SceneList;
