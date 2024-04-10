import Link from "next/link";

import Footer from "@/app/lib/ui/Footer";

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-24">
      <h1 className="text-2xl lg:text-4xl font-bold text-left mt-12 mb-4">
        Model List Page
      </h1>
      <Link href="/model/1" className="text-blue-600 hover:text-blue-800">
        Model 1
      </Link>
      <Footer />
    </main>
  );
}
