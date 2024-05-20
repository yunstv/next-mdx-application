import * as React from "react";
import classNames from "classnames";

export const Container: React.FC<
  {
    className?: string | void;
  } & React.PropsWithChildren
> = ({ children }) => (
  <main className="flex flex-1 flex-col">
    <div className="container relative w-full flex-col space-y-4 py-6 md:grid  md:grid-cols-12 md:gap-6 md:space-y-0">
      {children}
    </div>
  </main>
);

export default Container;
