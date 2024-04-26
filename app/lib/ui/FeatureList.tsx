"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import LoadingSpinner from "@/app/lib/ui/LoadingSpinner";

import FeatureCard from "@/app/lib/ui/FeatureCard";

const FeatureList: React.FC<{
  featureIds: string[];
}> = ({ featureIds }) => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [visibleFeatureIds, setVisibleFeatureIds] = useState<string[]>([]);

  useEffect(() => {
    setVisibleFeatureIds(featureIds.slice(0, 5));
  }, [featureIds]);

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

  const handleItemsRendered = useCallback(
    ({ visibleStopIndex }: { visibleStopIndex: number }) => {
      if (visibleStopIndex === visibleFeatureIds.length - 1) {
        // Load more items when the last item is visible
        const nextVisibleFeatureIds = featureIds.slice(
          0,
          visibleFeatureIds.length + 3
        );
        setVisibleFeatureIds(nextVisibleFeatureIds);
      }
    },
    [visibleFeatureIds.length, featureIds]
  );

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <div style={style}>
      <FeatureCard featureId={visibleFeatureIds[index]} />
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
        itemCount={visibleFeatureIds.length}
        onItemsRendered={handleItemsRendered}
      >
        {Row}
      </List>
    </div>
  );
};

export default FeatureList;
