import * as React from 'react';
import * as Portal from '@radix-ui/react-portal';

const PortalDemo = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative overflow-hidden p-[30px] rounded-lg bg-white/10">
      <button
        className="inline-flex h-9 items-center justify-center rounded bg-white px-4 text-sm font-medium text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Hide toast' : 'Show toast (rendered in document.body)'}
      </button>
      {open && (
        <Portal.Root>
          <div className="fixed bottom-6 right-6 z-[100] rounded-lg bg-slate12 px-4 py-3 text-sm text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
            ✨ Hi from a portal — escaped overflow:hidden of the parent.
          </div>
        </Portal.Root>
      )}
    </div>
  );
};

export default PortalDemo;
