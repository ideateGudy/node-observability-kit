export default function NotFound() {
  return (
    <div className="p-6 sm:p-12 text-white bg-[#090d16] min-h-screen flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-extrabold text-2xl mb-4">
        404
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">Page Not Found</h2>
      <p className="text-slate-400 text-sm sm:text-base max-w-md mb-6">
        The requested telemetry route or documentation page does not exist or has been moved.
      </p>
      <a
        href="/"
        className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm no-underline shadow-lg transition-all"
      >
        Return to Home
      </a>
    </div>
  );
}
