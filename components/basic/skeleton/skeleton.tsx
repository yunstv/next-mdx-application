'use client';
import React from 'react';

function Skeleton({ loop }: { loop?: number }) {
  const _loops = React.useMemo(() => {
    const arr = Array.from({ length: loop || 1 });
    return arr;
  }, [loop]);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      {_loops.map((_, key) => (
        <div key={key} className="flex w-5/6 max-w-3xl flex-col gap-2">
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
