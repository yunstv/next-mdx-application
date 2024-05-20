import * as React from 'react';
import { cn } from '@utils';

export const Container: React.FC<
  {
    className?: string | void;
  } & React.PropsWithChildren
> = ({ children }) => (
  <main className="flex flex-1 flex-col">
    <div className="border-t border-gray-100">{children}</div>
  </main>
);

export const ContainerWrap: React.FC<
  {
    className?: string | void;
  } & React.PropsWithChildren
> = ({ children }) => (
  <div className={cn('container pt-6 lg:pt-8')}>{children}</div>
);

export default Container;
