import TopNeuronsListCards from "@/app/lib/ui/TopNeuronsListCards";
import LoadingSpinner from "@/app/lib/ui/LoadingSpinner";
import { Suspense } from "react";
import Footer from "@/app/lib/ui/Footer";

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-24">
      <h1 className="text-2xl lg:text-4xl font-bold text-left mt-12 mb-4">
        Top Activating Neurons for TinyCLIP
      </h1>
      <div className="text-gray-700 text-sm sm:text-base">
        These are the neurons that fire most within each layer, on this dataset.
        The parts of the image highlighted in yellow indicate the patches where
        the neuron fired most strongly. Look out for high-level concepts the
        neuron consistently fires for across images!
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <TopNeuronsListCards countNeuronsPerLayer={3} />
      </Suspense>
      <Footer />
    </main>
  );
}
