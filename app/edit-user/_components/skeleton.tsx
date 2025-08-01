export default function skeleton() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-400 rounded w-1/3 mb-4"></div>
            <div className="h-20 bg-gray-400 rounded w-[90%] mb-4 "></div>
            <div className="h-30 bg-gray-400 rounded w-2/3 mb-4"></div>
            <div className="h-20 bg-gray-400 rounded w-3/4 mb-4"></div>
            <div className="h-20 bg-gray-400 rounded w-1/3 mb-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
