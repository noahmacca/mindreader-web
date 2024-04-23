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
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight * 0.75,
        width: window.innerWidth,
      });
    };

    // Set initial dimensions
    handleResize();

    // Update dimensions on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
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
        width={"100%"}
        itemSize={615}
        itemCount={featureIds.length}
      >
        {Row}
      </List>
    </div>
  );
};

export default FeatureList;
