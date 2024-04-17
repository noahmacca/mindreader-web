"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function FeatureCardFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const sort = searchParams.get("sort") || "Max Activation";
  const layers = searchParams.get("layers") || "All";

  const handleSelectChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    window.location.href = `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex flex-row space-x-4">
      <div className="flex flex-col items-start">
        <label className="mb-1">Sort</label>
        <select
          className="border border-gray-300 rouπnded-md px-2 py-1 min-w-48"
          value={sort}
          onChange={(e) => handleSelectChange("sort", e.target.value)}
        >
          <option value="max">Max Activation</option>
          <option value="min">Min Activation</option>
          <option value="random">Random</option>
        </select>
      </div>
      <div className="flex flex-col items-start">
        <label className="mb-1">Choose Layers</label>
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
    </div>
  );
}
