"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const prettifyQueryParam = (param: string) => {
  return param
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

type FeatureStat = {
  modelName: string;
  featureType: string;
  layerType: string;
  layerIdx: number;
  count: number;
};

interface ModelData {
  [modelName: string]: {
    total: number;
    featureTypes: {
      [featureType: string]: {
        layers: Array<{ layerType: string; layerIdx: number }>;
      };
    };
  };
}

export default function FeatureCardFilters({
  filterValStats,
}: {
  filterValStats: FeatureStat[];
}) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const pathname = usePathname();
  const { replace } = useRouter();

  // Aggregate data to create structured filter options
  const modelData: ModelData = filterValStats.reduce<ModelData>(
    (acc, { modelName, featureType, layerType, layerIdx, count }) => {
      if (!acc[modelName]) {
        acc[modelName] = { total: 0, featureTypes: {} };
      }
      acc[modelName].total += count;
      if (!acc[modelName].featureTypes[featureType]) {
        acc[modelName].featureTypes[featureType] = { layers: [] };
      }
      acc[modelName].featureTypes[featureType].layers.push({
        layerType,
        layerIdx,
      });
      return acc;
    },
    {}
  );

  // Sort models by total count descending
  const sortedModels = Object.entries(modelData).sort(
    (a, b) => b[1].total - a[1].total
  );

  const model = searchParams.get("model") || sortedModels[0][0];
  const features =
    searchParams.get("features") ||
    Object.keys(sortedModels[0][1].featureTypes)[0];
  const layers = searchParams.get("layers") || "8";
  const sort = searchParams.get("sort") || "max_activation";

  // Check if any of the parameters are not set and set them to default values
  if (
    !searchParams.has("model") ||
    !searchParams.has("features") ||
    !searchParams.has("layers") ||
    !searchParams.has("sort")
  ) {
    const params = new URLSearchParams(searchParams);
    params.set("model", model);
    params.set("features", features);
    params.set("layers", layers);
    params.set("sort", sort);
    replace(`${pathname}?${params.toString()}`);
    return null; // Prevent further rendering until navigation is complete
  }

  const handleSelectChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery === "") {
      params.delete("search");
    } else {
      params.set("search", searchQuery);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // Ensure selections are valid to prevent runtime errors
  const validModel = modelData[model] ? model : sortedModels[0][0];
  const validFeatures = modelData[validModel].featureTypes[features]
    ? features
    : Object.keys(modelData[validModel].featureTypes)[0];

  // Sort layers lexically by layerType and then by layerIdx
  const sortedLayers = modelData[validModel].featureTypes[
    validFeatures
  ].layers.sort((a, b) => {
    const layerTypeComparison = a.layerType.localeCompare(b.layerType);
    if (layerTypeComparison !== 0) return layerTypeComparison;
    return a.layerIdx - b.layerIdx;
  });

  const renderLabelAndInput = (label: string, children: React.ReactNode) => (
    <div className="flex flex-row space-x-2 items-center md:space-x-0 md:flex-col md:space-y-0.5 md:items-start">
      <label className="font-semibold">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="flex text-sm flex-col space-y-1 md:flex-row md:space-x-4 md:text-lg md:space-y-0">
      {renderLabelAndInput(
        "Search",
        <form onSubmit={handleSearch} className="flex space-x-0.5 md:space-x-0">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-2 py-0.5"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='For example, "dog"'
          />
          <button
            type="submit"
            className="border border-gray-300 rounded-md px-2 py-0.5"
          >
            Go
          </button>
        </form>
      )}
      {renderLabelAndInput(
        "Model",
        <select
          className="border border-gray-300 rounded-md px-2 py-0.5 min-w-48"
          value={validModel}
          onChange={(e) => handleSelectChange("model", e.target.value)}
        >
          {sortedModels.map(([modelName]) => (
            <option key={modelName} value={modelName}>
              {prettifyQueryParam(modelName)}
            </option>
          ))}
        </select>
      )}
      {renderLabelAndInput(
        "Features",
        <select
          className="border border-gray-300 rounded-md px-2 py-0.5 min-w-48"
          value={validFeatures}
          onChange={(e) => handleSelectChange("features", e.target.value)}
        >
          {Object.keys(modelData[validModel].featureTypes).map(
            (featureType) => (
              <option key={featureType} value={featureType}>
                {prettifyQueryParam(featureType)}
              </option>
            )
          )}
        </select>
      )}
      {renderLabelAndInput(
        "Layers",
        <select
          className="border border-gray-300 rounded-md px-2 py-0.5 min-w-48"
          value={layers}
          onChange={(e) => handleSelectChange("layers", e.target.value)}
        >
          <option value="all">All</option>
          {sortedLayers.map(({ layerType, layerIdx }) => (
            <option
              key={`${layerType}-${layerIdx}`}
              value={layerIdx}
            >{`${layerType} ${layerIdx}`}</option>
          ))}
        </select>
      )}
      {renderLabelAndInput(
        "Sort By",
        <select
          className="border border-gray-300 rounded-md px-2 py-0.5 min-w-48"
          value={sort}
          onChange={(e) => handleSelectChange("sort", e.target.value)}
        >
          <option value="max_activation">Max Activation</option>
          <option value="max_autointerp_label">Best Top Label</option>
          <option value="min_activation">Min Activation</option>
          <option value="random">Random</option>
        </select>
      )}
    </div>
  );
}
