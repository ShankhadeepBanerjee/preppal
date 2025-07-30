import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <Loader className="h-8 w-8 animate-spin text-primary-200" />
        <p className="text-light-100">Loading feedback...</p>
      </div>
    </div>
  );
}
