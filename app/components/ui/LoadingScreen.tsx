export default function Loading() {
  return (
    <div
      data-testid="loading-screen"
      className="flex min-h-screen flex-col items-center justify-center"
    >
      <div className="h-16 w-16 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
      <div className="mt-4 flex flex-col items-center text-center">
        <span className="mt-2 max-w-md text-sm text-gray-600">
          Fetching pre-rendered HTML from server...
        </span>
      </div>
    </div>
  )
}
