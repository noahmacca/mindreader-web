"use client";

import React from "react";
import FeatureCard from "@/app/lib/ui/FeatureCard";
import { Feature } from "@prisma/client";

const FeatureList: React.FC<{
  features: Feature[];
}> = ({ features }) => {
  return (
    <div className="flex flex-col space-y-4 mt-8">
      {features.map((feature, index) => (
        <div key={index}>
          <FeatureCard featureId={feature.id} />
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
