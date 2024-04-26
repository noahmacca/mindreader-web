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

  const prettyAutointerpString = (
    text: string,
    query: string | null
  ): JSX.Element | string => {
    try {
      const parsed = JSON.parse(text);
      if (
        Array.isArray(parsed) &&
        parsed.every((item) => Array.isArray(item) && item.length === 2)
      ) {
        return (
          <div>
            {parsed.map(([label, score], index) => (
              <>
                {index > 0 && ", "}
                {query && label.toLowerCase().includes(query.toLowerCase()) ? (
                  <span key={index} style={{ backgroundColor: "#ffff99" }}>
                    {label.charAt(0).toUpperCase() + label.slice(1)} ({score})
                  </span>
                ) : (
                  <span key={index}>
                    {label.charAt(0).toUpperCase() + label.slice(1)} ({score})
                  </span>
                )}
              </>
            ))}
          </div>
        );
      }
    } catch (error) {
      console.error("Failed to parse autointerp text:", error);
    }
    return text; // Fallback to raw text if parsing fails or format is incorrect
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
            <div className="font-bold">Autointerp (score)</div>
            <div className="font-light">
              {feature.autoInterp
                ? prettyAutointerpString(feature.autoInterp, userSearchQuery)
                : "No autointerp description found."}
            </div>
          </div>
          {/* <div>
            <div className="font-bold">Correlated Features</div>
            <div>TODO</div>
          </div> */}
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
