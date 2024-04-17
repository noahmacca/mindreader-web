import React from "react";
import FeatureCard from "@/app/lib/ui/FeatureCard";

import { getFeaturesForLayer } from "@/app/lib/data";

const FeatureList: React.FC<{
  selectedSort: string;
  selectedLayers: string;
}> = async ({ selectedSort, selectedLayers }) => {
  const features = await getFeaturesForLayer(selectedLayers, selectedSort);

  return (
    <div className="flex flex-col space-y-4 mt-8">
      {features.map((feature, index) => (
        <div key={index}>
          <FeatureCard feature={feature} />
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
