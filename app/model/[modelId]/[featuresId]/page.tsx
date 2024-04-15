// "use client";

import Link from "next/link";

import { getSampleFeatureData } from "@/localData/utils";
import Footer from "@/app/lib/ui/Footer";
import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";

import HistogramChart from "@/app/lib/ui/HistogramChart";
import HoverGrid from "@/app/lib/ui/HoverGrid";

import { getFeaturesForLayer } from "@/app/lib/data";
import FeatureList from "@/app/lib/ui/FeatureList";

const Page: React.FC<{
  params: { modelId: string; featuresId: string };
}> = ({ params }) => {
  // const features = await getFeaturesForLayer(6);
  // console.log("GOT FEATURES FROM DB");
  // console.log(features);

  // const data = getSampleNeuronData();

  const data = getSampleFeatureData();

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-24 bg-stone-100">
      <div>
        <div className="flex flex-row space-x-4 text-2xl">
          <div>
            Model <b>{data.modelId}</b>
          </div>
          <div className="border-l-2 border-gray-300 pl-4">
            Visualizing <b>{data.featureType}</b>
          </div>
          <div className="border-l-2 border-gray-300 pl-4">
            Nodes <b>{data.nodeCount}</b>
          </div>
        </div>
        <div className="mt-4 w-full text-gray-700">
          The visualization below describes the information contained in each
          neuron in the network.
        </div>
      </div>
      <div className="w-full border-t border-gray-300 my-8"></div>
      <div className="flex flex-row space-x-4">
        <div>
          <label className="mb-1">Search</label>
          <div className="flex items-center">
            <input
              type="text"
              className="border border-gray-300 rounded-md px-2 py-1 mr-2"
            />
            <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
              Go
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <label className="mb-1">Sort</label>
          <select className="border border-gray-300 rounded-md px-2 py-1 min-w-48">
            <option value="Max Activation">Max Activation</option>
            <option value="Min Activation">Min Activation</option>
            <option value="Random">Random</option>
          </select>
        </div>
        <div className="flex flex-col items-start">
          <label className="mb-1">Choose Layers</label>
          <select className="border border-gray-300 rounded-md px-2 py-1 min-w-48">
            <option value="All">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>
      <FeatureList />
      <Footer />
    </main>
  );
};

export default Page;
