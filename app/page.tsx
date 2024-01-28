import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24 w-xl max-w-4xl mx-auto">
      <div className="text-4xl font-semibold mt-12 mb-2">Mindreader</div>
      <div>
        Can we interpret what&#39;s happening inside of vision transformers?
        This is a simple project that explores the concepts being learned by
        individual neurons, as a step towards understanding more fully how these
        amazing models do what they do.
      </div>
      <div className="mt-8">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/neuron"
        >
          Explore TinyCLIP
        </Link>
      </div>
      <div className="mt-4 italic text-gray-400">More coming soon...</div>
    </main>
  );
}
