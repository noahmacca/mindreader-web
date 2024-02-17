"use client";

import { useState, useEffect } from "react";
import { CorrNeuronsWithActivations } from "@/app/lib/types";
import NeuronPreviewCarousel from "@/app/lib/ui/NeuronPreviewCarousel";

export default function CorrNeuronsInsets({
  corrNeuronsWithActivations,
}: {
  corrNeuronsWithActivations: CorrNeuronsWithActivations;
}) {
  const [activeTab, setActiveTab] = useState(
    corrNeuronsWithActivations.upstreamCorrNeurons.length > 0
      ? "upstream"
      : corrNeuronsWithActivations.downstreamCorrNeurons.length > 0
      ? "downstream"
      : "sameLayer"
  );
  const [showMore, setShowMore] = useState(false);

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

  const renderNeurons = (neurons: any) => {
    const visibleNeurons = showMore ? neurons : neurons.slice(0, 1);
    return visibleNeurons.map((neuronWithActivations: any) => (
      <div key={neuronWithActivations.id} className="fade-in">
        <NeuronPreviewCarousel
          neuronWithActivations={neuronWithActivations}
          shouldIndent={false}
        />
      </div>
    ));
  };

  const hasMultipleNeurons = (neurons: any) => neurons.length > 1;

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    setShowMore(tabName === activeTab ? !showMore : true); // Expand the view when a filter button is clicked
  };

  return (
    <div className="bg-white p-2 lg:p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-1 lg:mb-2">Correlated Neurons</h2>
      <div className="mb-2 lg:mb-4 flex flex-row items-center space-x-0">
        <label className="inline-block mr-2 text-sm font-medium text-gray-600">
          Filter
        </label>
        <button
          className={`py-1 px-2 text-sm rounded-md ${
            activeTab === "upstream"
              ? "text-gray-700 bg-white shadow"
              : "text-gray-400 bg-transparent"
          }`}
          onClick={() => handleTabClick("upstream")}
        >
          Earler Layers
        </button>
        <button
          className={`py-1 px-2 text-sm rounded-md ${
            activeTab === "sameLayer"
              ? "text-gray-700 bg-white shadow"
              : "text-gray-400 bg-transparent"
          }`}
          onClick={() => handleTabClick("sameLayer")}
        >
          Same Layer
        </button>
        <button
          className={`py-1 px-2 text-sm rounded-md ${
            activeTab === "downstream"
              ? "text-gray-700 bg-white shadow"
              : "text-gray-400 bg-transparent"
          }`}
          onClick={() => handleTabClick("downstream")}
        >
          Later Layers
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
      {hasMultipleNeurons(
        activeTab === "upstream"
          ? corrNeuronsWithActivations.upstreamCorrNeurons
          : activeTab === "downstream"
          ? corrNeuronsWithActivations.downstreamCorrNeurons
          : corrNeuronsWithActivations.sameLayerCorrNeurons
      ) && (
        <div className="flex justify-center mt-4">
          <button
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "See Less ▲" : "See More ▼"}
          </button>
        </div>
      )}
    </div>
  );
}
