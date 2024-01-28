import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24 w-xl">
      <div className="text-4xl font-semibold mt-12 mb-2">Mindreader</div>
      <div>
        This is a small mechanistic interpretability project to try and
        understand what the neurons inside vision transformers are actually
        learning.
      </div>
      <Link
        className="text-blue-600 hover:text-blue-800 visited:text-purple-600 mt-4"
        href="/neuron"
      >
        Top activating neurons
      </Link>
    </main>
  );
}
