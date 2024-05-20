'use client';
import React from 'react';

function Loading({ loop }: { loop?: number }) {
  const _loops = React.useMemo(() => {
    const arr = Array.from({ length: loop || 1 });
    return arr;
  }, [loop]);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      {_loops.map((_, key) => (
        <div
          key={key}
          className="flex w-5/6 max-w-3xl flex-col items-center justify-center gap-2"
        >
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ))}
    </div>
  );
}

export default Loading;
