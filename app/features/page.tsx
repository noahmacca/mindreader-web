import Footer from "@/app/lib/ui/Footer";
import FeatureList from "@/app/lib/ui/FeatureList";
import FeatureCardFilters from "@/app/lib/ui/FeatureCardFilters";
import {
  getFeaturesForLayer,
  getUniqueFeatureAttributes,
} from "@/app/lib/data";

const prettifyQueryParam = (param: string) => {
  return param
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const Page: React.FC<{
  params: { modelId: string; featuresId: string };
  searchParams?: {
    model?: string;
    features?: string;
    sort?: string;
    layers?: string;
    search?: string;
  };
}> = async ({ params, searchParams }) => {
  const filterValStats = await getUniqueFeatureAttributes();

  const selectedModel = searchParams?.model || "";
  const selectedFeatures = searchParams?.features || "";
  const selectedSort = searchParams?.sort || "";
  const selectedLayers = searchParams?.layers || "";

  const features = await getFeaturesForLayer(
    selectedModel,
    selectedFeatures,
    selectedLayers,
    selectedSort,
    searchParams?.search
  );
  const featureIds: string[] = features.map((f) => f.id);

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-24 bg-stone-100">
      <div>
        <div className="flex flex-row space-x-4 text-2xl">
          <div>
            Model <b>{prettifyQueryParam(selectedModel)}</b>
          </div>
          <div className="border-l-2 border-gray-300 pl-4">
            Visualizing <b>{prettifyQueryParam(selectedFeatures)}</b>
          </div>
        </div>
        <div className="mt-4 w-full text-gray-700">
          The visualization below describes the information contained in each
          neuron in the network.
        </div>
      </div>
      <div className="w-full border-t border-gray-300 my-8"></div>

      <FeatureCardFilters filterValStats={filterValStats} />
      {featureIds.length === 0 ? (
        <div className="text-red-700 text-xl mt-10">
          <p>No feature data found 😅</p>
        </div>
      ) : (
        <FeatureList featureIds={featureIds} />
      )}
      <Footer />
    </main>
  );
};

export default Page;
