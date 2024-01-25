import { fetchTopActivationsForNeuron } from "@/app/lib/data";

export default async function Home() {
  const data = await fetchTopActivationsForNeuron("7_FC1_489");
  // const data = await fetchTopActivationsForNeuron("7_FC1_961");
  const neuron = data[0].Neuron;

  return (
    <main className="flex min-h-screen flex-col p-24 w-xl">
      <div className="text-4xl font-semibold mt-12 mb-4">Welcome!</div>
    </main>
  );
}
