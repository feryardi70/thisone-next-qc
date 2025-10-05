'use client'

export default function TerminalLoader() {
  return (
    <div className="w-[500px] bg-black text-lime-500 font-mono rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-neutral-800 flex items-center px-2 py-1 text-white">
        <div className="flex space-x-2 mr-4">
          <span className="h-3.5 w-3.5 rounded-full bg-red-500"></span>
          <span className="h-3.5 w-3.5 rounded-full bg-yellow-400"></span>
          <span className="h-3.5 w-3.5 rounded-full bg-green-500"></span>
        </div>
        <div className="flex-grow text-center text-sm">Status</div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="inline-flex items-center">
          <span className="mr-2">Loading</span>
          <span className="opacity-0 animate-dotFadeInOut" style={{ animationDelay: '0.5s' }}>.</span>
          <span className="opacity-0 animate-dotFadeInOut" style={{ animationDelay: '0.6s' }}>.</span>
          <span className="opacity-0 animate-dotFadeInOut" style={{ animationDelay: '0.7s' }}>.</span>
        </div>
      </div>

      {/* Custom animation */}
      <style jsx>{`
        @keyframes dotFadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .animate-dotFadeInOut {
          animation: dotFadeInOut 1.5s infinite;
        }
      `}</style>
    </div>
  );
}
