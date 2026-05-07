import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

const Button = React.forwardRef(({ asChild, className = '', ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      ref={ref}
      className={`inline-flex h-[35px] items-center justify-center rounded bg-white px-4 text-sm font-medium text-violet11 hover:bg-mauve3 ${className}`}
      {...props}
    />
  );
});
Button.displayName = 'Button';

const SlotDemo = () => (
  <div className="flex gap-2.5">
    <Button>Plain button</Button>
    <Button asChild>
      <a href="https://radix-ui.com" target="_blank" rel="noreferrer">As link</a>
    </Button>
  </div>
);

export default SlotDemo;
