export default function ImageWithHeatmap({
  imageData,
  heatmapData,
}: {
  imageData: String;
  heatmapData: String;
}) {
  return (
    <div className="relative inline-block rounded w-full">
      <img
        src={`data:image/jpeg;base64,${imageData}`}
        alt={`Image`}
        className="block w-full rounded"
      />
      <div className="opacity-50 hover:opacity-0 transition-opacity duration-150">
        <div className="bg-red-600 absolute top-0 left-0 w-full h-full"></div>
        <img
          src={`data:image/jpeg;base64,${heatmapData}`}
          className="absolute top-0 left-0 mix-blend-multiply w-full rounded"
          alt="Activation heatmap"
        />
      </div>
    </div>
  );
}
