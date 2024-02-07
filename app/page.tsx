import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-24 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-4xl font-semibold mt-12 mb-2">
        Mindreader
      </h1>
      <p className="text-gray-700 text-sm md:text-base">
        Can we interpret what&apos;s happening inside of vision transformers?
        This is a simple project that explores the concepts being learned by
        individual neurons, as a step towards understanding more fully how these
        amazing models do what they do.
      </p>
      <div className="mt-8">
        <Link
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/neuron"
        >
          Explore TinyCLIP
        </Link>
      </div>
      <div className="mt-4 italic text-gray-400 text-xs md:text-sm">
        More coming soon...
      </div>
    </main>
  );
}
