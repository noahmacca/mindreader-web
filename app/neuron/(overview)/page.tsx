import { listNeurons } from "@/app/lib/data";
import Link from "next/link";

export default async function Page() {
  const neurons = await listNeurons();
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-left my-12">
        Top Activating Neurons
      </h1>
      {neurons.map((neuron) => (
        <Link href={`/neuron/${neuron.id}`}>
          <div className="rounded overflow-hidden shadow-lg my-4 transition-transform duration-300 ease-in-out hover:-translate-y-0.5 cursor-pointer bg-gray-50">
            <div className="px-4 py-4">
              <div className="font-bold text-xl mb-2">{neuron.id}</div>
              <div className="text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Max Activation:</span>
                  <span className="text-gray-700">{neuron.maxActivation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Top Classes:</span>
                  <span className="text-gray-700">{neuron.topClasses}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
      Overview
    </div>
  );
}
