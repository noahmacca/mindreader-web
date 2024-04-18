"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function FeatureCardFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const model = searchParams.get("model") || "clip_tiny";
  const features = searchParams.get("features") || "neurons";
  const sort = searchParams.get("sort") || "Max Activation";
  const layers = searchParams.get("layers") || "All";

  const handleSelectChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-row space-x-4">
      <div className="flex flex-col items-start">
        <label className="mb-1">Model</label>
        <select
          className="border border-gray-300 rounded-md px-2 py-1 min-w-48"
          value={model}
          onChange={(e) => handleSelectChange("model", e.target.value)}
        >
          <option value="clip_tiny">Clip Tiny</option>
          <option value="clip_full">Clip Full</option>
        </select>
      </div>
      <div className="flex flex-col items-start">
        <label className="mb-1">Features</label>
        <select
          className="border border-gray-300 rounded-md px-2 py-1 min-w-48"
          value={features}
          onChange={(e) => handleSelectChange("features", e.target.value)}
        >
          <option value="neuron">Neuron</option>
          <option value="sae_1024">SAE (1024)</option>
        </select>
      </div>
      <div className="flex flex-col items-start">
        <label className="mb-1">Layers</label>
        <select
          className="border border-gray-300 rounded-md px-2 py-1 min-w-48"
          value={layers}
          onChange={(e) => handleSelectChange("layers", e.target.value)}
        >
          <option value="all">All</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </div>
      <div className="flex flex-col items-start">
        <label className="mb-1">Sort By</label>
        <select
          className="border border-gray-300 rounded-md px-2 py-1 min-w-48"
          value={sort}
          onChange={(e) => handleSelectChange("sort", e.target.value)}
        >
          <option value="max">Max Activation</option>
          <option value="min">Min Activation</option>
          <option value="random">Random</option>
        </select>
      </div>
    </div>
  );
}
