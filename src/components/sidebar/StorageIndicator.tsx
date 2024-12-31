export const StorageIndicator = () => (
  <div className="right-4 bottom-4 left-4 absolute">
    <div className="bg-white/5 p-4 rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex justify-center items-center bg-blue-500/20 rounded-full w-8 h-8">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <div>
          <h4 className="font-medium text-sm text-white">Storage</h4>
          <p className="text-gray-400 text-xs">3.5 GB of 10 GB used</p>
        </div>
      </div>
      <div className="bg-white/10 rounded-full h-1.5 overflow-hidden">
        <div className="bg-blue-500 rounded-full w-[35%] h-full" />
      </div>
    </div>
  </div>
); 