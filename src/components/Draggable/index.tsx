// Draggable/index.tsx - Draggable Container
//
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from "react";

type IProps = {
  id: number;
  index: number;
  children: React.ReactNode;
  onDragStart(e: any): void;
  onDragOver(e: any): void;
  onDrop(e: any): void;
  onDragLeave(): void;
};

const Draggable: React.FC<IProps> = (props: IProps) => {
  const {
    id,
    index,
    onDragStart,
    onDragOver,
    onDrop,
    onDragLeave,
    children,
  } = props;
  return (
    <div
      className="draggable"
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      draggable="true"
      data-id={id}
      data-position={index}
    >
      {children}
    </div>
  );
};

export default Draggable;
