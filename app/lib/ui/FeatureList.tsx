"use client";

import React, { useEffect, useState, useCallback } from "react";
import FeatureCard from "@/app/lib/ui/FeatureCard";
import { useInView } from "react-intersection-observer";
import { debounce } from "lodash";

const FeatureList: React.FC<{
  featureIds: string[];
}> = ({ featureIds }) => {
  const [showFeatureIds, setShowFeatureIds] = useState(featureIds.slice(0, 2));

  const { ref, inView } = useInView();

  const debouncedSetShowFeatureIds = debounce(() => {
    console.log(
      "debouncedSetShowFeatureIds updating, len=",
      showFeatureIds.length
    );
    const newFeatureIds = featureIds.slice(0, showFeatureIds.length + 1);
    setShowFeatureIds(newFeatureIds);
  }, 300);

  useEffect(() => {
    if (inView) {
      debouncedSetShowFeatureIds();
      console.log("load more", inView, showFeatureIds);
    }
  }, [inView, showFeatureIds, featureIds, debouncedSetShowFeatureIds]);

  return (
    <div className="flex flex-col space-y-4 mt-8">
      {showFeatureIds.map((featureId, index) => (
        <div key={featureId}>
          <FeatureCard featureId={featureId} />
        </div>
      ))}
      <div ref={ref} />
    </div>
  );
};

export default FeatureList;
