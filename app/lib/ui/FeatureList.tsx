"use client";

import React from "react";
import { FixedSizeList as List } from "react-window";

import FeatureCard from "@/app/lib/ui/FeatureCard";

const FeatureList: React.FC<{
  featureIds: string[];
}> = ({ featureIds }) => {
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

  return (
    <div className="mt-4 rounded">
      <List
        height={window.innerHeight * 0.7}
        width="100%"
        itemSize={435}
        itemCount={featureIds.length}
      >
        {Row}
      </List>
    </div>
  );
};

export default FeatureList;
