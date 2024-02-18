"use client";

import { useState, useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { CorrNeuronsWithActivations } from "@/app/lib/types";
import NeuronPreviewCarousel from "@/app/lib/ui/NeuronPreviewCarousel";

export default function CorrNeuronsInsets({
  corrNeuronsWithActivations,
}: {
  corrNeuronsWithActivations: CorrNeuronsWithActivations;
}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1024));

  const [activeTab, setActiveTab] = useState(
    corrNeuronsWithActivations.upstreamCorrNeurons.length > 0
      ? "upstream"
      : corrNeuronsWithActivations.downstreamCorrNeurons.length > 0
      ? "downstream"
      : "sameLayer"
  );
  // Default to expanded on desktop
  const [isCollapsed, setIsCollapsed] = useState(!isDesktop);

  useEffect(() => {
    if (
      corrNeuronsWithActivations.upstreamCorrNeurons.length === 0 &&
      corrNeuronsWithActivations.downstreamCorrNeurons.length > 0
    ) {
      setActiveTab("downstream");
    } else if (
      corrNeuronsWithActivations.upstreamCorrNeurons.length === 0 &&
      corrNeuronsWithActivations.downstreamCorrNeurons.length === 0
    ) {
      setActiveTab("sameLayer");
    }
  }, [
    corrNeuronsWithActivations.upstreamCorrNeurons,
    corrNeuronsWithActivations.downstreamCorrNeurons,
  ]);

  useEffect(() => {
    setIsCollapsed(!isDesktop);
  }, [isDesktop]);

  const renderNeurons = (neurons: any) => {
    return neurons.map((neuronWithActivations: any) => (
      <div key={neuronWithActivations.id} className="fade-in">
        <NeuronPreviewCarousel
          neuronWithActivations={neuronWithActivations}
          shouldIndent={false}
        />
      </div>
    ));
  };

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="bg-white py-2 px-3 lg:p-4 rounded-lg shadow">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleCollapse}
      >
        <h2 className="text-lg font-semibold lg:mb-1">Correlated Neurons</h2>
        <span className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
          {isCollapsed ? "Expand ▼" : "Collapse ▲"}
        </span>
      </div>
      {!isCollapsed && (
        <>
          <div className="my-4 lg:mb-4 flex flex-row items-center space-x-0">
            <label className="inline-block mr-2 text-sm font-medium text-gray-600">
              Layers:
            </label>
            <button
              className={`py-1 px-2 text-sm rounded-md ${
                activeTab === "upstream"
                  ? "text-gray-700 bg-white shadow"
                  : "text-gray-400 bg-transparent"
              }`}
              onClick={() => handleTabClick("upstream")}
            >
              Earler
            </button>
            <button
              className={`py-1 px-2 text-sm rounded-md ${
                activeTab === "sameLayer"
                  ? "text-gray-700 bg-white shadow"
                  : "text-gray-400 bg-transparent"
              }`}
              onClick={() => handleTabClick("sameLayer")}
            >
              Same
            </button>
            <button
              className={`py-1 px-2 text-sm rounded-md ${
                activeTab === "downstream"
                  ? "text-gray-700 bg-white shadow"
                  : "text-gray-400 bg-transparent"
              }`}
              onClick={() => handleTabClick("downstream")}
            >
              Later
            </button>
          </div>
          <div className="flex flex-col space-y-2 rounded mb-2">
            {activeTab === "upstream" &&
              renderNeurons(corrNeuronsWithActivations.upstreamCorrNeurons)}
            {activeTab === "downstream" &&
              renderNeurons(corrNeuronsWithActivations.downstreamCorrNeurons)}
            {activeTab === "sameLayer" &&
              renderNeurons(corrNeuronsWithActivations.sameLayerCorrNeurons)}
          </div>
        </>
      )}
    </div>
  );
}
