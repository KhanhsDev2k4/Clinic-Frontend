import { Badge } from "@/components/ui/badge";
import DoctorListClient from "@/components/Landing/DoctorListClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find a Doctor | MedCare",
  description:
    "Browse our network of top-rated doctors. Filter by specialty, rating, and consultation fee.",
};

const DoctorsPage = () => {
  return (
    <main className="flex h-[calc(100vh-4rem)] overflow-hidden flex-col">
      {/* Hero header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 mb-3">
            Our Doctors
          </Badge>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find a Doctor</h1>
          <p className="text-gray-500 text-sm max-w-xl">
            Browse our network of top-rated specialists. Filter by specialty, rating, or
            consultation fee to find the perfect match for your needs.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-8 w-full flex-1 flex flex-col h-full">
        <DoctorListClient />
      </div>
    </main>
  );
};

export default DoctorsPage;
