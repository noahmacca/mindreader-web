"use client";

import { useState } from "react";

import { Feature } from "@/app/lib/data";

import Image from "next/image";

import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";

import HistogramChart from "@/app/lib/ui/HistogramChart";
import HoverGrid from "@/app/lib/ui/HoverGrid";

import {
  getSampleFeatureData,
  getSampleTooltipInfoObjects,
} from "@/localData/utils";

const FeatureCard = ({ feature }: { feature: Feature }) => {
  const sampleData = getSampleFeatureData();
  const tooltipInfoObjects = getSampleTooltipInfoObjects();
  const [selectedActivation, setSelectedActivation] = useState<number | null>(
    null
  );

  return (
    <div className="p-6 bg-white border rounded-lg w-full">
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
                ? feature.autoInterp
                : "No autointerp description found."}
            </div>
          </div>
          <div>
            <div className="font-bold">Correlated Upstream Features</div>
            {sampleData.features[0].corrsUpstream.map(
              (corr: any, idx: number) => (
                <div key={idx} className="font-light">
                  <u>{corr.featureIdx}</u> {corr.humanInterp} (Corr: {corr.corr}
                  )
                </div>
              )
            )}
          </div>
          <div>
            <div className="font-bold">Correlated Upstream Features</div>
            {sampleData.features[0].corrsDownstream.map(
              (corr: any, idx: number) => (
                <div key={idx} className="font-light">
                  <u>{corr.featureIdx}</u> {corr.humanInterp} (Corr: {corr.corr}
                  )
                </div>
              )
            )}
          </div>
          <div>
            <div className="font-bold mb-4">Activations</div>
            <div className="h-36 -ml-4 pr-4">
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
          <div className="flex flex-wrap gap-4 relative">
            {feature.highestActivatingImages
              .slice(0, 15)
              .map((imageId, imgIdx) => (
                <div
                  key={imgIdx}
                  className="h-48 w-48 md:h-36 md:w-36 relative z-0"
                >
                  <Image
                    unoptimized
                    src={`https://mindreader-web.s3.amazonaws.com/image_v2/${imageId}.jpg`}
                    alt="Mindreader Visualization"
                    className="block w-full rounded"
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
