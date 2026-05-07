import * as React from 'react';
import * as Portal from '@radix-ui/react-portal';
import './styles.css';

const PortalDemo = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="Wrap">
      <button className="Button" onClick={() => setOpen((v) => !v)}>
        {open ? 'Hide toast' : 'Show toast (rendered in document.body)'}
      </button>
      {open && (
        <Portal.Root>
          <div className="Toast">
            ✨ Hi from a portal — escaped overflow:hidden of the parent.
          </div>
        </Portal.Root>
      )}
    </div>
  );
};

export default PortalDemo;
