import Link from "next/link";
import { fetchImageInfo } from "@/app/lib/data";

import TopActivationsForImage from "@/app/lib/ui/TopActivationsForImage";
import { prettifyClass } from "@/app/lib/helpers";
import { Suspense } from "react";
import LoadingSpinner from "@/app/lib/ui/LoadingSpinner";
import Footer from "@/app/lib/ui/Footer";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const imageInfo = await fetchImageInfo(id);

  if (!imageInfo) {
    throw new Error(`No image data found for id=${id}`);
  }

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-24 w-full md:w-xl">
      <div className="mt-12 mb-3">
        <Link className="text-blue-600 hover:text-blue-800 mb-2" href="/neuron">
          All Neurons
        </Link>
        <div className="text-2xl md:text-4xl font-semibold">
          Image: {prettifyClass(imageInfo.label)}
        </div>
      </div>
      <div>
        <span className="font-medium">Image ID:</span>
        <span> {imageInfo.id}</span>
      </div>
      <div>
        <span className="font-medium">Overall Model Prediction: </span>
        <span>
          {prettifyClass(imageInfo.predicted)}
          {imageInfo.label === imageInfo.predicted ? (
            <span className="text-green-500 ml-1">✅</span>
          ) : (
            <span className="text-red-500 ml-1">❌</span>
          )}
        </span>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <TopActivationsForImage imageId={id} />
      </Suspense>
      <Footer />
    </main>
  );
}
