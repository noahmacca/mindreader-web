"use client";

import React, { useState } from "react";

import { plasmaCmap } from "@/app/lib/constants";

interface HoverGridProps {
  infoStrings: Array<{
    label: string;
    activation: number;
    zScore: number;
    patchIdx: number;
  }>;
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

  const handleMouseEnter = (squareId: number) => {
    setHoveredSquare(squareId);
    onSquareHover && onSquareHover(squares[squareId].info.activation);
  };

  const handleMouseLeave = () => {
    setHoveredSquare(null);
    onSquareHover && onSquareHover(null);
  };

  const getColorForZScore = (
    zScore: number,
    minZ: number = 0,
    maxZ: number = 4
  ) => {
    const index = Math.min(
      plasmaCmap.length - 1,
      Math.max(
        0,
        Math.round(((zScore - minZ) / (maxZ - minZ)) * (plasmaCmap.length - 1))
      )
    );
    const [r, g, b] = plasmaCmap[index];
    return `rgb(${r * 255}, ${g * 255}, ${b * 255})`;
  };

  const maxZScore = Math.max(...squares.map((s) => s.info.zScore));

  return (
    <div
      className={`grid grid-cols-14 grid-rows-14`}
      style={{ height: "100%" }}
    >
      {squares.map((square, index) => (
        <div
          key={index}
          className="relative hover:cursor-pointer z-0"
          style={{
            backgroundColor: `${getColorForZScore(
              square.info.zScore,
              maxZScore
            )}`,
            opacity: hoveredSquare === square.id ? 0.6 : 0.3,
          }}
          onMouseEnter={() => handleMouseEnter(square.id)}
          onMouseLeave={handleMouseLeave}
        >
          {hoveredSquare === square.id && (
            <div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-100 pointer-events-none bg-opacity-100"
              style={{
                opacity: 1.0,
              }}
            >
              <div>
                label: <b>{square.info.label}</b>
                <br />
                activation: <b>{square.info.activation.toFixed(2)}</b>
                <br />
                zScore: <b>{square.info.zScore.toFixed(2)}</b>
                <br />
                patchIdx: <b>{square.info.patchIdx}</b>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HoverGrid;
