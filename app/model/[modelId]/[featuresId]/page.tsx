import Link from "next/link";

import { getSampleNeuronData } from "@/localData/utils";
import Footer from "@/app/lib/ui/Footer";
import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";

export default async function Page({
  params,
}: {
  params: { modelId: string; featuresId: string };
}) {
  const data = getSampleNeuronData();
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-24 bg-stone-100">
      <div>
        <div className="flex flex-row space-x-4 text-2xl">
          <div>
            Model <b>{data.modelId}</b>
          </div>
          <div className="border-l-2 border-gray-300 pl-4">
            Visualizing <b>{data.featureType}</b>
          </div>
          <div className="border-l-2 border-gray-300 pl-4">
            Nodes <b>{data.nodeCount}</b>
          </div>
        </div>
        <div className="mt-4 w-full text-gray-700">
          The visualization below describes the information contained in each
          neuron in the network.
        </div>
      </div>
      <div className="w-full border-t border-gray-300 my-8"></div>
      <div className="flex flex-row space-x-4">
        <div>
          <label className="mb-1">Search</label>
          <div className="flex items-center">
            <input
              type="text"
              className="border border-gray-300 rounded-md px-2 py-1 mr-2"
            />
            <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
              Go
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <label className="mb-1">Sort</label>
          <select className="border border-gray-300 rounded-md px-2 py-1 min-w-48">
            <option value="Max Activation">Max Activation</option>
            <option value="Min Activation">Min Activation</option>
            <option value="Random">Random</option>
          </select>
        </div>
        <div className="flex flex-col items-start">
          <label className="mb-1">Choose Layers</label>
          <select className="border border-gray-300 rounded-md px-2 py-1 min-w-48">
            <option value="All">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col space-y-4 mt-12">
        {data.features.map((f, index) => (
          <div key={index} className="p-6 bg-white border rounded-lg">
            <div className="text-xl flex flex-row">
              <div>
                {`L:${f.feature.layerIdx} (${f.feature.layerType}) N:${f.feature.featureIdx}`}{" "}
                <b>{f.feature.humanInterp}</b>
              </div>
            </div>
            <div className="w-full border-t border-gray-300 my-2" />
            <div className="flex flex-row space-x-6">
              <div className="flex flex-col space-y-4">
                <div>
                  <div className="font-bold">Autointerp</div>
                  <div className="font-light">{f.feature.autoInterp}</div>
                </div>
                <div>
                  <div className="font-bold">Correlated Upstream Features</div>
                  {f.corrsUpstream.map((corr, idx) => (
                    <div key={idx} className="font-light">
                      <u>{corr.featureIdx}</u> {corr.humanInterp} (Corr:{" "}
                      {corr.corr})
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-bold">
                    Correlated Downstream Features
                  </div>
                  {f.corrsDownstream.map((corr, idx) => (
                    <div key={idx} className="font-light">
                      <u>{corr.featureIdx}</u> {corr.humanInterp} (Corr:{" "}
                      {corr.corr})
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-bold">Activations</div>
                  <div className="font-light">
                    Values: [{f.feature.activationHist.join(", ")}]
                  </div>
                </div>
              </div>
              <div>
                <div className="font-bold mb-2">Most Activating Images</div>
                <div className="grid grid-cols-5 grid-rows-2 gap-2">
                  {f.images.map((image, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="bg-gray-300 h-40 w-40 hover:bg-gray-400"
                    >
                      <ImageWithHeatmap
                        imageId={448}
                        neuronId="9_FC1_828"
                        noHover
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </main>
  );
}
// src="https://mindreader-web.s3.amazonaws.com/neuron-image-activation/neuron-9_FC1_828-image-78.jpg"
// src =
//   "https://mindreader-web.s3.amazonaws.com/neuron-image-activation/neuron-9_FC1_828-image-448.jpg";
