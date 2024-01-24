import Image from "next/image";
import {
  fetchNeurons,
  fetchImagesById,
  fetchTopActivationsForNeuron,
} from "@/app/lib/data";

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

export default async function Home() {
  // const data = await fetchTopActivationsForNeuron("7_FC1_489");
  const data = await fetchTopActivationsForNeuron("7_FC1_961");
  const neuron = data[0].Neuron;

  return (
    <main className="flex min-h-screen flex-col p-24 w-xl">
      <div className="text-4xl font-semibold mt-12 mb-4">
        Neuron: {neuron.id}
      </div>
      <div>Fires most strongly for: {neuron.topClasses}</div>

      <div className="flex flex-row flex-wrap space-x-4 mt-8">
        {data.map((activation, index) => (
          <div
            key={index}
            className="w-72 rounded overflow-hidden shadow-lg my-4 transition-transform duration-300 ease-in-out hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="relative inline-block rounded w-full">
              <img
                src={`data:image/jpeg;base64,${activation.Image.data}`}
                alt={`Image ${index}`}
                className="block w-full"
              />
              <div className="opacity-35 hover:opacity-0 transition-opacity duration-150">
                <div className="bg-red-500 bg-blend-multiply absolute top-0 left-0 w-full h-full"></div>
                <img
                  src={`data:image/jpeg;base64,${activation.patchActivationsScaled}`}
                  className="absolute top-0 left-0 mix-blend-darken w-full"
                />
              </div>
            </div>
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
