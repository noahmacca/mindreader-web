import Link from "next/link";
import TopActivationsForNeuron from "@/app/lib/ui/TopActivationsForNeuron";
import { Suspense } from "react";
import LoadingSpinner from "@/app/lib/ui/LoadingSpinner";
import Footer from "@/app/lib/ui/Footer";
import { fetchTopCorrsForNeuron } from "@/app/lib/data";
import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";

import CorrNeuronsInsets from "@/app/lib/ui/CorrNeuronsInsets";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const layerId = id.split("_")[0];
  const neuronId = id.split("_").pop();

  const corrData = await fetchTopCorrsForNeuron(id, 7);

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-24">
      <div className="mt-12 mb-3">
        <Link href="/neuron" className="text-blue-600 hover:text-blue-800 mb-2">
          All Layers
        </Link>
        <div className="text-2xl md:text-4xl font-semibold">
          Layer {layerId}, Neuron {neuronId}
        </div>
        <div className="text-gray-500">
          These are the images for which this neuron fired most strongly.
        </div>
      </div>
      <div>
        <CorrNeuronsInsets corrNeuronsWithActivations={corrData} />
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <TopActivationsForNeuron neuronId={id} />
      </Suspense>
      <Footer />
    </main>
  );
}
