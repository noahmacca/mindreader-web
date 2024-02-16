import Link from "next/link";
import TopNeuronsListCards from "@/app/lib/ui/TopNeuronsListCards";
import LoadingSpinner from "@/app/lib/ui/LoadingSpinner";
import { Suspense } from "react";
import Footer from "@/app/lib/ui/Footer";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-24">
      <Link
        href="/neuron"
        className="text-blue-600 hover:text-blue-800 mb-2 mt-12"
      >
        All Layers
      </Link>
      <h1 className="text-2xl lg:text-4xl font-bold text-left mb-4">
        Layer {params.id.split("_")[0]}
      </h1>
      <div className="text-gray-700 text-sm sm:text-base">
        These are the neurons that fire most within this layer, on this dataset.
        The parts of the image highlighted in yellow indicate the patches where
        the neuron fired most strongly.
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <TopNeuronsListCards layerId={params.id} countNeuronsPerLayer={50} />
      </Suspense>
      <Footer />
    </main>
  );
}
