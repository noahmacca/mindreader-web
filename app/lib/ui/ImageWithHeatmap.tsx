import Image from "next/image";

export default function ImageWithHeatmap({
  imageId,
  neuronId,
}: {
  imageId: Number;
  neuronId: String;
}) {
  return (
    <div className="relative inline-block rounded w-full">
      <Image
        src={`https://mindreader-web.s3.amazonaws.com/image/${imageId}.jpg`}
        alt="Mindreader Visualization"
        className="block w-full rounded"
        width={500}
        height={500}
      />
      <div className="opacity-45 hover:opacity-0 transition-opacity duration-150">
        <Image
          src={`https://mindreader-web.s3.amazonaws.com/neuron-image-activation/neuron-${neuronId}-image-${imageId}.jpg`}
          alt="Activation heatmap"
          className="absolute top-0 left-0 w-full rounded pixelated"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
