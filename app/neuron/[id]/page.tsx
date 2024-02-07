import Link from "next/link";
import TopActivationsForNeuron from "@/app/lib/ui/TopActivationsForNeuron";
import { Suspense } from "react";
import LoadingSpinner from "@/app/lib/ui/LoadingSpinner";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-24">
      <div className="mt-12 mb-3">
        <Link href="/neuron" className="text-blue-600 hover:text-blue-800 mb-2">
          All Neurons
        </Link>
        <div className="text-2xl md:text-4xl font-semibold">Neuron: {id}</div>
        <div className="text-gray-500">
          These are the images for which this neuron fired most strongly.
        </div>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <TopActivationsForNeuron neuronId={id} />
      </Suspense>
    </main>
  );
}
