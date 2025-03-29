import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full border-8 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-8 border-t-green-600 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-lg font-medium text-gray-600">
          Carregando Agro Mind...
        </p>
      </div>
    </div>
  );
}
