import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import './styles.css';

const Button = React.forwardRef(({ asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className="Button" {...props} ref={ref} />;
});
Button.displayName = 'Button';

const SlotDemo = () => (
  <div style={{ display: 'flex', gap: 10 }}>
    <Button>Plain button</Button>
    <Button asChild>
      <a href="https://radix-ui.com" target="_blank" rel="noreferrer">As link</a>
    </Button>
  </div>
);

export default SlotDemo;
