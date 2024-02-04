import TopNeuronsListCards from "@/app/lib/ui/TopNeuronsListCards";
import LoadingSpinner from "@/app/lib/ui/LoadingSpinner";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-left mt-32 mb-4">
        Top Activating Neurons for TinyCLIP
      </h1>
      <div className="text-gray-700">
        These are the neurons that fire most strongly across our image dataset,
        for each layer of the model. The neuron fires most strongly for the
        parts of each image highlighted in yellow. You can hover your mouse over
        the image to reveal the original image, or click on one of the
        neuron&apos;s cards to see how it activated on even more images. Look
        out for high-level concepts the neuron consistently fires for across
        images!
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <TopNeuronsListCards />
      </Suspense>
    </div>
  );
}
