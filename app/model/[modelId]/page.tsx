import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { modelId: string };
}) {
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-24">
      <div>Model Page for Model: {params.modelId}</div>
      <Link
        href={`/model/${params.modelId}/neurons`}
        className="text-blue-600 hover:text-blue-800"
      >
        Go to observed neuron features
      </Link>
      <Link
        href={`/model/${params.modelId}/sae_256`}
        className="text-blue-600 hover:text-blue-800"
      >
        Go to SAE-decoded features (width=256)
      </Link>
      <Link
        href={`/model/${params.modelId}/sae_512`}
        className="text-blue-600 hover:text-blue-800"
      >
        Go to SAE-decoded features (width=512)
      </Link>
    </main>
  );
}
