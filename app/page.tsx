import Image from "next/image";
import {
  fetchNeurons,
  fetchImagesById,
  fetchTopActivationsForNeuron,
} from "@/app/lib/data";

export default async function Home() {
  const neurons = await fetchNeurons();
  const topActivations = await fetchTopActivationsForNeuron(neurons[0].id);
  const images = await fetchImagesById(
    topActivations
      .map((item) => item.image_id)
      .filter((id) => id !== null) as number[]
  );
  const sortedImages = images.sort((a, b) => {
    return (
      topActivations.findIndex((item) => item.image_id === a.id) -
      topActivations.findIndex((item) => item.image_id === b.id)
    );
  });

  console.log("component", neurons);

  // const blob = new Blob([images[0].data], { type: 'image/png' }); // Adjust MIME type if necessary
  // Create a URL for the blob
  // const url = URL.createObjectURL(blob);

  return (
    <main className="flex min-h-screen flex-col p-24 w-xl">
      <div className="text-2xl">Input</div>
      <form className="mt-2">
        <label htmlFor="neuronIdx">Neuron idx:</label>
        <select id="neuronIdx">
          {/* Replace with your actual options */}
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>

        <label htmlFor="imageIdx">Image idx:</label>
        <select id="imageIdx">
          {/* Replace with your actual options */}
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>

        <button type="submit">Submit</button>
      </form>

      <div className="text-2xl my-4">Reference Neuron</div>
      <div className="neuron-info">
        <p>ID: {neurons[0].id}</p>
        <p>
          Max Activation:{" "}
          {neurons[0].max_activation && neurons[0].max_activation.toFixed(4)}
        </p>
        <p>Top Classes: {neurons[0].top_classes}</p>
      </div>

      <div className="text-2xl my-4">Top Activations</div>
      {topActivations.map((activation, index) => (
        <div key={index}>
          <p>Neuron ID: {activation.neuron_id}</p>
          <p>Image ID: {activation.image_id}</p>
          <p>
            Patch Activations:{" "}
            {activation.patch_activations.slice(0, 10).join(", ")}...
          </p>
        </div>
      ))}

      {sortedImages.map((image, index) => (
        <div className="p-4" key={index}>
          {image.id}, {image.label}, {image.predicted}
          <img
            src={`data:image/jpeg;base64,${image.data}`}
            alt={`Image ${index}`}
          />
        </div>
      ))}
    </main>
  );
}
