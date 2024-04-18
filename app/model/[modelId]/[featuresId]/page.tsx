// "use client";

import Link from "next/link";
import { Suspense } from "react";

import { getSampleFeatureData } from "@/localData/utils";
import Footer from "@/app/lib/ui/Footer";
import FeatureList from "@/app/lib/ui/FeatureList";
import FeatureCardFilters from "@/app/lib/ui/FeatureCardFilters";
import LoadingSpinner from "@/app/lib/ui/LoadingSpinner";
import { getFeaturesForLayer } from "@/app/lib/data";

const Page: React.FC<{
  params: { modelId: string; featuresId: string };
  searchParams?: {
    sort?: string;
    layers?: string;
  };
}> = async ({ params, searchParams }) => {
  const selectedSort = searchParams?.sort || "";
  const selectedLayers = searchParams?.layers || "";

  const features = await getFeaturesForLayer(selectedLayers, selectedSort);

  const modelName = params.modelId
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const featuresName = params.featuresId
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-24 bg-stone-100">
      <div>
        <div className="flex flex-row space-x-4 text-2xl">
          <div>
            Model <b>{modelName}</b>
          </div>
          <div className="border-l-2 border-gray-300 pl-4">
            Visualizing <b>{featuresName}</b>
          </div>
        </div>
        <div className="mt-4 w-full text-gray-700">
          The visualization below describes the information contained in each
          neuron in the network.
        </div>
      </div>
      <div className="w-full border-t border-gray-300 my-8"></div>

      <FeatureCardFilters />
      <Suspense fallback={<LoadingSpinner />}>
        <FeatureList features={features} />
      </Suspense>
      <Footer />
    </main>
  );
};

export default Page;
