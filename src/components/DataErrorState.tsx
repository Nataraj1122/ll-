import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface DataErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function DataErrorState({ message, onRetry }: DataErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-zinc-100 bg-zinc-50 rounded-lg">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-lg font-serif mb-2">Failed to Load Content</h3>
      {message && (
        <div className="bg-red-50 text-red-700 text-xs p-3 rounded mb-4 max-w-md border border-red-100 font-mono break-words">
          {message}
        </div>
      )}
      <p className="text-sm text-zinc-500 mb-6 max-w-md">
        There was a problem connecting to our database. Please check your connection and try again.
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 bg-black text-white text-[10px] uppercase tracking-widest font-bold hover:bg-zinc-800 transition-colors"
      >
        <RefreshCw size={14} />
        Retry Now
      </button>
    </div>
  );
}
