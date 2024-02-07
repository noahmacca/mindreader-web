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
    if (item.maxActivation > 3.0) {
      activationLevel = "Very High (>3.0)";
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
        <div>
          <div className="text-md text-gray-500 mt-8">Activation Level</div>
          <div className="text-xl font-semibold">
            {activationLevel.activation_level}
          </div>
          <div className="flex flex-row flex-wrap">
            {activationLevel.data.map((activation, index) => (
              <Link
                href={`/neuron/${activation.Neuron.id}`}
                key={index}
                className="w-24 lg:w-36 rounded overflow-hidden shadow-lg my-2 mr-2 transition-transform duration-300 ease-in-out hover:-translate-y-0.5 cursor-pointer bg-gray-50"
              >
                <ImageWithHeatmap
                  imageId={activation.Image.id}
                  neuronId={activation.Neuron.id}
                />
                <div className="px-2 py-1 text-xs text-gray-700">
                  <div>{activation.Neuron.id}</div>
                  <div>{renderActivation(activation.maxActivation)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
