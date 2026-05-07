import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { styled } from '@stitches/react';
import { violet } from '@radix-ui/colors';

const StyledButton = styled('button', {
  all: 'unset',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  height: 35, padding: '0 16px', borderRadius: 4, backgroundColor: 'white',
  color: violet.violet11, fontSize: 14, fontWeight: 500, cursor: 'pointer',
});

const Button = React.forwardRef(({ asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <StyledButton as={Comp} {...props} ref={ref} />;
});
Button.displayName = 'Button';

const Box = styled('div', { display: 'flex', gap: 10 });

const SlotDemo = () => (
  <Box>
    <Button>Plain button</Button>
    <Button asChild>
      <a href="https://radix-ui.com" target="_blank" rel="noreferrer">As link</a>
    </Button>
  </Box>
);

export default SlotDemo;
