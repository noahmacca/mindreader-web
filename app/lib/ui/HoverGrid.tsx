"use client";

import React, { useState, useEffect, useRef } from "react";

import { plasmaCmap } from "@/app/lib/constants";

interface HoverGridProps {
  infoStrings: Array<{
    label: string;
    activation: number;
    zScore: number;
    patchIdx: number;
  }>;
  onSquareHover?: (activation: number | null) => void;
  showDefaultTooltip?: boolean;
}

const HoverGrid: React.FC<HoverGridProps> = ({
  infoStrings,
  onSquareHover,
  showDefaultTooltip = false,
}) => {
  const squares = infoStrings.map((info, index) => ({
    id: index,
    info,
  }));

  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);
  const prevShowDefaultTooltip = useRef(showDefaultTooltip);

  useEffect(() => {
    if (showDefaultTooltip) {
      const highestActivationSquare = squares.reduce((prev, current) => {
        return prev.info.activation > current.info.activation ? prev : current;
      });
      setHoveredSquare(highestActivationSquare.id);
      onSquareHover && onSquareHover(highestActivationSquare.info.activation);
    } else if (prevShowDefaultTooltip.current && !showDefaultTooltip) {
      setHoveredSquare(null);
    }
    prevShowDefaultTooltip.current = showDefaultTooltip;
  }, [showDefaultTooltip, squares, onSquareHover]);

  const handleMouseEnter = (squareId: number) => {
    setHoveredSquare(squareId);
    onSquareHover && onSquareHover(squares[squareId].info.activation);
  };

  const handleMouseLeave = () => {
    if (!showDefaultTooltip) {
      setHoveredSquare(null);
      onSquareHover && onSquareHover(null);
    }
  };

  const getColorForActivation = (
    activation: number,
    minA: number = 0,
    maxA: number = 4
  ) => {
    const index = Math.min(
      plasmaCmap.length - 1,
      Math.max(
        0,
        Math.round(
          ((activation - minA) / (maxA - minA)) * (plasmaCmap.length - 1)
        )
      )
    );
    if (!index) {
      // TODO figure out why we hit this
      return "rgb(0,0,0)";
    }
    const [r, g, b] = plasmaCmap[index];
    return `rgb(${r * 255}, ${g * 255}, ${b * 255})`;
  };

  const maxActivation = Math.max(...squares.map((s) => s.info.activation));

  return (
    <div className="grid grid-cols-14 grid-rows-14" style={{ height: "100%" }}>
      {squares.map((square, index) => (
        <div
          key={index}
          className="relative"
          onMouseEnter={() => handleMouseEnter(square.id)}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              backgroundColor: `${getColorForActivation(
                square.info.activation,
                0,
                maxActivation
              )}`,
              opacity: hoveredSquare === square.id ? 0.7 : 0.35,
              height: "100%",
              width: "100%",
              // border: "0.1px solid white",
            }}
          />
          {hoveredSquare === square.id && (
            <div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-50 pointer-events-none bg-opacity-90"
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
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HoverGrid;
