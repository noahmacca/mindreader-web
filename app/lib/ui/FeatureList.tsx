"use client";

import React, { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import LoadingSpinner from "@/app/lib/ui/LoadingSpinner";

import FeatureCard from "@/app/lib/ui/FeatureCard";

const FeatureList: React.FC<{
  featureIds: string[];
}> = ({ featureIds }) => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  useEffect(() => {
    // Set dimensions once the window is available
    setDimensions({
      height: window.innerHeight * 0.7,
      width: window.innerWidth,
    });
  }, []);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <div style={style}>
      <FeatureCard featureId={featureIds[index]} />
    </div>
  );

  if (typeof window === "undefined") {
    return <LoadingSpinner />;
  }

  if (dimensions.height === 0 || dimensions.width === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-4 rounded">
      <List
        height={dimensions.height}
        width={dimensions.width}
        itemSize={570}
        itemCount={featureIds.length}
      >
        {Row}
      </List>
    </div>
  );
};

export default FeatureList;
