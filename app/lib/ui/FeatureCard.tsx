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
      <div className="p-6 bg-white border rounded-lg w-full h-1/4">
        <div className="text-xl h-1/4">Loading Feature {featureId}</div>
        <div className="w-full border-t border-gray-300 my-4" />
        <div className="my-48">
          <LoadingSpinner />
        </div>
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
      className="p-6 bg-white border rounded-lg w-full overflow-hidden"
      style={{ height: "550px" }}
    >
      <div className="text-xl flex flex-row">
        <div>
          {`L:${feature.layerIdx} (${feature.layerType}) N:${feature.featureIdx}`}{" "}
          <b>{feature.humanInterp}</b>
        </div>
      </div>
      <div className="w-full border-t border-gray-300 my-4" />
      <div className="flex flex-row space-x-10 w-full">
        <div className="flex flex-col space-y-4 w-1/4">
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
            <div className="font-bold mb-4">Activations</div>
            <div className="h-40 -ml-4 pr-4">
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
        <div className="w-3/4">
          <div className="font-bold mb-2">Most Activating Images</div>
          <div className="flex flex-wrap gap-2 relative">
            {feature.highestActivatingImages
              // .slice(0, 16)
              .map((imageId, imgIdx) => (
                <div
                  key={imgIdx}
                  className="lg:h-32 lg:w-32 md:h-24 md:w-24 h-20 w-20 relative"
                >
                  <Image
                    unoptimized
                    src={`https://mindreader-web.s3.amazonaws.com/image_v2/${imageId}.jpg`}
                    alt="Mindreader Visualization"
                    className="block w-full z-0"
                    width={600}
                    height={600}
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
