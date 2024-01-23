import Image from "next/image";
import { fetchNeurons } from "@/app/lib/data";

export default async function Home() {
  const neurons = await fetchNeurons();
  console.log("component", neurons[0].top_classes);

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

      <div className="w-xl mt-24">
        <div className="text-2xl my-4">Neurons</div>
        <table>
          <thead>
            <tr className="text-left">
              <th>ID</th>
              <th>Max Activation</th>
              <th>Top Classes</th>
            </tr>
          </thead>
          <tbody>
            {neurons.slice(0, 20).map((neuron, index) => (
              <tr key={index}>
                <td>{neuron.id}</td>
                <td>{neuron.max_activation.toFixed(4)}</td>
                <td>{neuron.top_classes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
