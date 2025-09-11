import { useMemo } from 'react';

// Create a search index for faster lookups
export const useSearchIndex = (data, searchFields = ['name']) => {
  const searchIndex = useMemo(() => {
    const index = new Map();
    
    data.forEach((item, idx) => {
      searchFields.forEach(field => {
        const value = item[field];
        if (value) {
          const words = value.toLowerCase().split(/\s+/);
          words.forEach(word => {
            if (!index.has(word)) {
              index.set(word, new Set());
            }
            index.get(word).add(idx);
          });
        }
      });
    });
    
    return index;
  }, [data, searchFields]);

  const search = useMemo(() => {
    return (query) => {
      if (!query.trim()) return [];
      
      const searchTerms = query.toLowerCase().split(/\s+/);
      let resultIndices = new Set();
      
      searchTerms.forEach(term => {
        if (searchIndex.has(term)) {
          if (resultIndices.size === 0) {
            resultIndices = new Set(searchIndex.get(term));
          } else {
            resultIndices = new Set(
              [...resultIndices].filter(idx => 
                searchIndex.get(term).has(idx)
              )
            );
          }
        }
      });
      
      return [...resultIndices].map(idx => data[idx]);
    };
  }, [searchIndex, data]);

  return { search, searchIndex };
};
