import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";
import { renderActivation, prettifyClass } from "@/app/lib/helpers";
import { fetchTopActivationsForNeuron } from "@/app/lib/data";
import Link from "next/link";

export default async function TopActivationsForNeuron({
  neuronId,
}: {
  neuronId: string;
}) {
  const data = await fetchTopActivationsForNeuron(neuronId, 100);
  if (data.length === 0) {
    throw new Error(`No neuron data found for id=${neuronId}`);
  }

  return (
    <div className="flex flex-row flex-wrap mt-8">
      {data.map((activation, index) => (
        <Link
          href={`/image/${activation.Image.id}`}
          key={index}
          className="w-36 rounded overflow-hidden shadow-lg my-2 transition-transform duration-300 ease-in-out hover:-translate-y-0.5 cursor-pointer bg-gray-50 mr-2"
        >
          <ImageWithHeatmap
            imageData={activation.Image.data}
            heatmapData={activation.patchActivationsScaled}
          />
          <div className="px-2 py-1 text-xs text-gray-700">
            <div>{prettifyClass(activation.Image.label)}</div>
            <div>{renderActivation(activation.maxActivation)}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
