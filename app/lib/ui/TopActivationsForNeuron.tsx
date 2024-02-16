import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";
import { renderActivation, prettifyClass } from "@/app/lib/helpers";
import { fetchTopActivationsForNeuron } from "@/app/lib/data";
import Link from "next/link";

interface ActivationData {
  activation_level: string;
  data: any[]; // Replace 'any' with a more specific type if possible
}

interface SortedData {
  [key: string]: ActivationData;
}

export default async function TopActivationsForNeuron({
  neuronId,
}: {
  neuronId: string;
}) {
  const data = await fetchTopActivationsForNeuron(neuronId, 50);
  if (data.length === 0) {
    throw new Error(`No neuron data found for id=${neuronId}`);
  }

  const sortedData = data.reduce((acc: SortedData, item) => {
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
          <div className="text-md text-gray-500 mt-8 mb-0">
            Neuron Activation Level
          </div>
          <div className="text-xl font-semibold mb-2">
            {activationLevel.activation_level}
          </div>
          <div className="flex flex-row flex-wrap gap-2 ml-2 lg:ml-4">
            {activationLevel.data.map((activation, index) => (
              <Link href={`/image/${activation.Image.id}`} key={index}>
                <div className="w-36 lg:w-48 rounded">
                  <ImageWithHeatmap
                    imageId={activation.Image.id}
                    neuronId={activation.Neuron.id}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
