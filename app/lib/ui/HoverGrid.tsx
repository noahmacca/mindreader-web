"use client";

import React, { useState } from "react";

interface HoverGridProps {
  infoStrings: Array<{ label: string; activation: number; zScore: number }>;
  onSquareHover?: (activation: number | null) => void;
}

const HoverGrid: React.FC<HoverGridProps> = ({
  infoStrings,
  onSquareHover,
}) => {
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  const squares = infoStrings.map((info, index) => ({
    id: index,
    info,
  }));

  const gridSize = Math.ceil(Math.sqrt(squares.length));
  const paddedSquares = [
    ...squares,
    ...Array(gridSize * gridSize - squares.length).fill(null),
  ];

  const handleMouseEnter = (squareId: number) => {
    setHoveredSquare(squareId);
    onSquareHover && onSquareHover(squares[squareId]?.info.activation ?? null);
  };

  const handleMouseLeave = () => {
    setHoveredSquare(null);
    onSquareHover && onSquareHover(null);
  };

  return (
    <div
      className={`grid grid-cols-14 grid-rows-14`}
      style={{ height: "100%" }}
    >
      {paddedSquares.map((square, index) => (
        <div
          key={index}
          className={`relative ${
            square
              ? "bg-transparent hover:cursor-pointer hover:bg-yellow-200 hover:bg-opacity-50"
              : ""
          }`}
          onMouseEnter={() => square && handleMouseEnter(square.id)}
          onMouseLeave={handleMouseLeave}
        >
          {square && hoveredSquare === square.id && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10 pointer-events-none">
              <div>
                label: <b>{square.info.label}</b>
                <br />
                activation: <b>{square.info.activation.toFixed(2)}</b>
                <br />
                zScore: <b>{square.info.zScore.toFixed(2)}</b>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HoverGrid;
