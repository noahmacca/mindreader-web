import Link from "next/link";
import TopActivationsForNeuron from "@/app/lib/ui/TopActivationsForNeuron";
import { Suspense } from "react";
import LoadingSpinner from "@/app/lib/ui/LoadingSpinner";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <main className="flex min-h-screen flex-col p-24 w-xl">
      <div className="mt-12 mb-3">
        <Link href="/neuron" className="text-blue-600 hover:text-blue-800 mb-2">
          All Neurons
        </Link>
        <div className="text-4xl font-semibold">Neuron: {id}</div>
        <div className="text-gray-700">
          These are the images that had the maximum firing strength for this
          particular neuron.
        </div>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <TopActivationsForNeuron neuronId={id} />
      </Suspense>
    </main>
  );
}
