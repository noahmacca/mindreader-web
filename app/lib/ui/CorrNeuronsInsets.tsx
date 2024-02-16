"use client";

import { useState } from "react";
import { CorrNeuronsWithActivations } from "@/app/lib/types";
import NeuronPreviewCarousel from "@/app/lib/ui/NeuronPreviewCarousel";

export default function CorrNeuronsInsets({
  corrNeuronsWithActivations,
}: {
  corrNeuronsWithActivations: CorrNeuronsWithActivations;
}) {
  const [activeTab, setActiveTab] = useState("upstream");
  const [showMore, setShowMore] = useState(false);

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

  return (
    <div className="bg-gray-100 p-2 lg:p-4 rounded-lg shadow">
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
          onClick={() => setActiveTab("upstream")}
        >
          Upstream Layers
        </button>
        <button
          className={`py-1 px-2 text-sm rounded-md ${
            activeTab === "downstream"
              ? "text-gray-700 bg-white shadow"
              : "text-gray-400 bg-transparent"
          }`}
          onClick={() => setActiveTab("downstream")}
        >
          Downstream Layers
        </button>
      </div>
      <div className="flex flex-col space-y-2 rounded mb-2">
        {activeTab === "upstream" &&
          renderNeurons(corrNeuronsWithActivations.upstreamCorrNeurons)}
        {activeTab === "downstream" &&
          renderNeurons(corrNeuronsWithActivations.downstreamCorrNeurons)}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "See Less ▲" : "See More ▼"}
        </button>
      </div>
    </div>
  );
}
