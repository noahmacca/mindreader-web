import Image from "next/image";
import { fetchTopActivationsForNeuron } from "@/app/lib/data";
import Link from "next/link";
import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";

function renderActivation(act: Number) {
  const actRound = Number(act.toFixed(3));
  if (actRound > 3) return `Very High (${actRound})`;
  if (actRound > 2) return `High (${actRound})`;
  if (actRound > 1) return `Moderate (${actRound})`;
  return `Low (${actRound})`;
}

function prettifyClass(strIn: String) {
  return strIn
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data = await fetchTopActivationsForNeuron(id, 50);
  if (data.length === 0) {
    throw new Error(`No neuron data found for id=${id}`);
  }
  const neuron = data[0].Neuron;

  return (
    <main className="flex min-h-screen flex-col p-24 w-xl">
      <div className="mt-12 mb-3">
        <Link href="/neuron" className="text-blue-600 hover:text-blue-800 mb-2">
          All Neurons
        </Link>
        <div className="text-4xl font-semibold">Neuron: {neuron.id}</div>
      </div>
      <div>Fires most strongly for: {neuron.topClasses}</div>

      <div className="flex flex-row flex-wrap space-x-4 mt-8">
        {data.map((activation, index) => (
          <div
            key={index}
            className="w-72 rounded overflow-hidden shadow-lg my-4 transition-transform duration-300 ease-in-out hover:-translate-y-0.5 cursor-pointer bg-gray-50"
          >
            <ImageWithHeatmap
              imageData={activation.Image.data}
              heatmapData={activation.patchActivationsScaled}
            />
            <div className="px-4 py-4">
              <div className="font-bold text-xl mb-2">
                {prettifyClass(activation.Image.label)}
              </div>
              <div className="text-md">
                <div className="flex justify-between">
                  <span className="font-medium">ID</span>
                  <span className="text-gray-700">{activation.Image.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Activation:</span>
                  <span className="text-gray-700">
                    {renderActivation(activation.maxActivation)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Predicted:</span>
                  <span>
                    {activation.Image.predicted}{" "}
                    {activation.Image.label === activation.Image.predicted ? (
                      <span className="text-green-500">✅</span>
                    ) : (
                      <span className="text-red-500">❌</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
