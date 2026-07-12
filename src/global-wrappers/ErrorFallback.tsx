const ErrorFallback = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-center">
        Oops! Something went wrong.
      </h2>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 text-sm rounded-md border border-white/20 hover:bg-white/10 transition-colors"
      >
        Reload page
      </button>
    </div>
  );
};

export default ErrorFallback;
