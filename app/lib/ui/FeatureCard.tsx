"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { getFeatureById, Feature } from "@/app/actions";
import LoadingSpinner from "@/app/lib/ui/LoadingSpinner";

import Image from "next/image";

import HistogramChart from "@/app/lib/ui/HistogramChart";
import HoverGrid from "@/app/lib/ui/HoverGrid";

const FeatureCard = ({ featureId }: { featureId: string }) => {
  const [selectedActivation, setSelectedActivation] = useState<number | null>(
    null
  );

  const [feature, setFeature] = useState<Feature | null>(null);

  const searchParams = useSearchParams();
  const userSearchQuery = searchParams.get("search");

  useEffect(() => {
    async function getFeatureData() {
      const response = await getFeatureById(featureId);
      setFeature(response);
    }
    getFeatureData();
  }, [featureId]);

  if (!feature) {
    return (
      <div
        className="p-3 lg:p-6 bg-white border rounded-lg w-full"
        style={{ height: "610px" }}
      >
        <div className="text-md lg:text-xl">{featureId} (Loading)</div>
        <div className="w-full border-t border-gray-300 my-4" />
        <LoadingSpinner />
      </div>
    );
  }
  const highlightSearchQuery = (
    text: string,
    query: string | null
  ): (string | JSX.Element)[] => {
    const parts = text.split(",");
    const highlightedParts: (string | JSX.Element)[] = [];
    parts.forEach((part, index) => {
      const match = part.match(/\((\d+\.\d+)%\)/);
      const percentage = match ? parseFloat(match[1]) : null;
      let opacity = 1; // Default opacity
      if (percentage !== null) {
        if (percentage >= 10) {
          opacity = 1;
        } else if (percentage <= 2) {
          opacity = 0.15;
        } else {
          opacity = ((percentage - 2) / (10 - 2)) * 0.75 + 0.15;
        }
      }

      highlightedParts.push(
        query && part.toLowerCase().includes(query.toLowerCase()) ? (
          <span className="bg-yellow-300" key={index}>
            {part}
            {index < parts.length - 1 ? "," : ""}
          </span>
        ) : (
          <span
            className="font-normal"
            key={index}
            style={{ opacity: opacity }}
          >
            {part}
            {index < parts.length - 1 ? "," : ""}
          </span>
        )
      );
    });
    return highlightedParts;
  };

  return (
    <div
      className="p-3 lg:p-6 bg-white border rounded-lg w-full overflow-hidden flex-row"
      style={{ height: "610px" }}
    >
      <div className="text-md lg:text-xl flex flex-row">
        <div>
          {`L:${feature.layerIdx} (${feature.layerType}) N:${feature.featureIdx}`}{" "}
          <b>{feature.humanInterp}</b>
        </div>
      </div>
      <div className="w-full border-t border-gray-300 my-2 lg:my-4" />
      <div className="text-sm lg:text-lg flex flex-col lg:flex-row lg:space-x-10 w-full">
        <div className="flex flex-col space-y-2 lg:space-y-4 w-full lg:w-1/4">
          <div>
            <div className="font-bold">Autointerp</div>
            <div className="font-light">
              {feature.autoInterp
                ? highlightSearchQuery(feature.autoInterp, userSearchQuery)
                : "No autointerp description found."}
            </div>
          </div>
          <div>
            <div className="font-bold">Correlated Upstream Features</div>
            <div>TODO</div>
          </div>
          <div>
            <div className="font-bold mb-1 lg:mb-2">Activations</div>
            <div className="h-28 lg:h-48 -ml-6 pr-4">
              <HistogramChart
                data={feature.activationHistVals.map((val, idx) => ({
                  bin: val.x,
                  count: val.y,
                }))}
                refLineXVal={selectedActivation}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-3/4">
          <div className="font-bold mb-1 lg:mb-2">Most Activating Images</div>
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 2xl:grid-cols-8 gap-0.5 md:gap-2 relative">
            {feature.highestActivatingImages
              .slice(0, window.innerWidth <= 640 ? 12 : 24)
              .map((imageId, imgIdx) => (
                <div key={imgIdx} className="relative aspect-square">
                  <Image
                    unoptimized
                    src={`https://mindreader-web.s3.amazonaws.com/image_v2/${imageId}.jpg`}
                    alt="Mindreader Visualization"
                    className="block w-full h-full z-0 object-cover"
                    fill
                  />
                  <div className="absolute inset-0">
                    <HoverGrid
                      infoStrings={feature.images[imageId].map((patch) => ({
                        label: patch.label ?? "No label",
                        activation: patch.activationValue,
                        zScore: patch.activationZScore,
                        patchIdx: patch.patchIdx,
                      }))}
                      onSquareHover={(squareIdx) => {
                        setSelectedActivation(squareIdx);
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
