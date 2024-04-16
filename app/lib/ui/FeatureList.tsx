import React, { useState } from "react";
import FeatureCard from "@/app/lib/ui/FeatureCard";

import { getFeaturesForLayer } from "@/app/lib/data";

import { getSampleFeatureData } from "@/localData/utils";

const FeatureList = async () => {
  const features = await getFeaturesForLayer(7);
  console.log("fetching featureData");

  return (
    <div className="flex flex-col space-y-4 mt-12">
      {features.map((feature, index) => (
        <div key={index}>
          <FeatureCard feature={feature} />
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
