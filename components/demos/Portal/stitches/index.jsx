import * as React from 'react';
import * as Portal from '@radix-ui/react-portal';
import { styled } from '@stitches/react';
import { blackA, slate, violet } from '@radix-ui/colors';

const PortalDemo = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Wrap>
      <Button onClick={() => setOpen((v) => !v)}>
        {open ? 'Hide toast' : 'Show toast (rendered in document.body)'}
      </Button>
      {open && (
        <Portal.Root>
          <Toast>✨ Hi from a portal — escaped overflow:hidden of the parent.</Toast>
        </Portal.Root>
      )}
    </Wrap>
  );
};

const Wrap = styled('div', {
  position: 'relative', overflow: 'hidden', padding: 30,
  borderRadius: 8, background: 'rgba(255,255,255,0.1)',
});
const Button = styled('button', {
  all: 'unset', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: 4, padding: '0 16px', fontSize: 14, fontWeight: 500,
  height: 36, background: 'white', color: violet.violet11,
  boxShadow: `0 2px 10px ${blackA.blackA7}`, cursor: 'pointer',
});
const Toast = styled('div', {
  position: 'fixed', bottom: 24, right: 24, zIndex: 100,
  padding: '12px 16px', borderRadius: 8,
  background: slate.slate12, color: 'white', fontSize: 14,
  boxShadow: `0 10px 30px ${blackA.blackA9}`,
});

export default PortalDemo;
