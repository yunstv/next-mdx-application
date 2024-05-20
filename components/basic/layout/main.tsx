import * as React from 'react';
import { cn } from '@utils';

export const Container: React.FC<
  {
    className?: string;
  } & React.PropsWithChildren
> = ({ className, children }) => (
  <div className={cn('container pt-6 lg:pt-8', className)}>{children}</div>
);

export default Container;
