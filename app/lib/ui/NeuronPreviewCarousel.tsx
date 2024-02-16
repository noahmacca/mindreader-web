import Link from "next/link";
import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";

type NeuronWithActivationsType = {
  topActivations: ({
    Neuron: {
      id: string;
      topClasses: string;
      maxActivation: number;
    };
    Image: {
      id: number;
      label: string;
      predicted: string;
    };
  } & {
    id: number;
    neuronId: string;
    imageId: number;
    maxActivation: number;
  })[];
  id: string;
  topClasses: string;
  maxActivation: number;
};

export default function NeuronPreviewCarousel({
  neuronWithActivations,
}: {
  neuronWithActivations: NeuronWithActivationsType;
}) {
  const isValidLayerIdPresent = false;
  return (
    <Link
      className="overflow-hidden cursor-pointer"
      href={`/neuron/${neuronWithActivations.id}`}
    >
      <div
        className={`p-2 lg:px-4 text-sm bg-gray-200 hover:bg-purple-200 rounded transition duration-200 ease-in-out ${
          !isValidLayerIdPresent ? "ml-2 lg:ml-4" : ""
        }`}
      >
        <span className="font-medium">
          Neuron {neuronWithActivations.id.split("_").pop()}
        </span>
        <div className="flex flex-row overflow-x-auto mt-1">
          {neuronWithActivations.topActivations.map((activation, index) => (
            <div
              key={`key-${activation.id}`}
              className="flex-none w-20 lg:w-28 rounded mr-1 mb-1 lg:mr-2"
            >
              <ImageWithHeatmap
                imageId={activation.Image.id}
                neuronId={activation.Neuron.id}
                noHover
              />
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
