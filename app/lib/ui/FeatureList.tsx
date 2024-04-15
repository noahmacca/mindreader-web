import React, { useState } from "react";
import FeatureCard from "@/app/lib/ui/FeatureCard";

import { getFeaturesForLayer } from "@/app/lib/data";

import { getSampleFeatureData } from "@/localData/utils";

const FeatureList = async () => {
  //   const data = getSampleNeuronData();
  const features = await getFeaturesForLayer(6);
  console.log("fetching faetureData");
  console.log(features);

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
