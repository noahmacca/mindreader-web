import Link from "next/link";
import { fetchTopActivationsForImage } from "@/app/lib/data";
import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";
import { renderActivation } from "@/app/lib/helpers";

interface ActivationData {
  activation_level: string;
  data: any[]; // Replace 'any' with a more specific type if possible
}

interface SortedData {
  [key: string]: ActivationData;
}

export default async function TopActivationsForImage({
  imageId,
}: {
  imageId: number;
}) {
  const data = await fetchTopActivationsForImage(imageId, 78);

  if (data.numActivations === 0) {
    throw new Error(`No image data found for id=${imageId}`);
  }

  const sortedData = data.activations.reduce((acc: SortedData, item) => {
    let activationLevel;
    if (item.maxActivation > 6.0) {
      activationLevel = "Very High (>6.0)";
    } else if (item.maxActivation > 5.0) {
      activationLevel = "Very High (>5.0)";
    } else if (item.maxActivation > 4.0) {
      activationLevel = "Very High (>4.0)";
    } else if (item.maxActivation > 3.0) {
      activationLevel = "High (>3.0)";
    } else if (item.maxActivation > 2.0) {
      activationLevel = "High (>2.0)";
    } else if (item.maxActivation > 1.0) {
      activationLevel = "Medium (>1.0)";
    } else {
      activationLevel = "Low (<1.0)";
    }

    if (!acc[activationLevel]) {
      acc[activationLevel] = { activation_level: activationLevel, data: [] };
    }
    acc[activationLevel].data.push(item);
    return acc;
  }, {});

  const activationLevels = Object.values(sortedData);

  return (
    <div>
      {activationLevels.map((activationLevel) => (
        <div key={`key-${activationLevel.activation_level}`}>
          <div className="text-md text-gray-500 mt-8">Activation Level</div>
          <div className="text-xl font-semibold mb-2">
            {activationLevel.activation_level}
          </div>
          <div className="flex flex-row flex-wrap gap-2 ml-2 lg:ml-4">
            {activationLevel.data.map((activation, index) => (
              <Link
                href={`/neuron/${activation.Neuron.id}`}
                key={index}
                className="w-36 lg:w-48 rounded overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-0.5 cursor-pointer bg-gray-50"
              >
                <ImageWithHeatmap
                  imageId={activation.Image.id}
                  neuronId={activation.Neuron.id}
                />
                <div className="px-2 pb-1 text-xs text-gray-700">
                  <div>
                    Layer {activation.Neuron.id.split("_")[0]}, Neuron{" "}
                    {activation.Neuron.id.split("_").pop()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
