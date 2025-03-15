import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="w-8 h-8 text-white animate-spin" />
    </div>
  );
};

export default LoadingSpinner;