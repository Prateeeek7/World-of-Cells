import React from 'react';

// Skeleton components for different UI elements
export const CellCardSkeleton = () => (
  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl p-4 min-h-[56px]">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

export const CellPageSkeleton = () => (
  <div className="min-h-screen p-4 md:p-8 animate-pulse">
    <div className="border-[12px] border-[#5a2328] rounded-3xl p-4 md:p-8">
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="w-11 h-11 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="w-48 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
      
      {/* Image skeleton */}
      <div className="flex justify-center mb-10">
        <div className="w-96 h-96 bg-gray-300 dark:bg-gray-600 rounded shadow"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="max-w-[96rem] space-y-10 px-2 md:px-10 lg:px-20 mx-auto">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const SearchSkeleton = () => (
  <div className="animate-pulse">
    <div className="w-full max-w-xs sm:max-w-xl mx-auto relative">
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
    </div>
  </div>
);

export const GroupPageSkeleton = () => (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6">
    <div className="animate-pulse w-full max-w-6xl">
      {/* Title skeleton */}
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
      
      {/* Description skeleton */}
      <div className="space-y-2 mb-8">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mx-auto"></div>
      </div>
      
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(12)].map((_, i) => (
          <CellCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

export default {
  CellCardSkeleton,
  CellPageSkeleton,
  SearchSkeleton,
  GroupPageSkeleton
};

