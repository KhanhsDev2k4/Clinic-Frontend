export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-400 mx-auto px-4 py-10">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
        <div className="mt-6 space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
