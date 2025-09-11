import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const VirtualizedList = ({ 
  items, 
  itemHeight = 60, 
  containerHeight = 400,
  renderItem,
  className = ''
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef(null);

  const visibleItems = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );
    
    return {
      start,
      end,
      items: items.slice(start, end)
    };
  }, [scrollTop, itemHeight, containerHeight, items]);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleItems.start * itemHeight;

  return (
    <div 
      ref={scrollElementRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.items.map((item, index) => 
            renderItem(item, visibleItems.start + index)
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualizedList;
