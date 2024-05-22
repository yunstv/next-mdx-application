import * as React from "react";
import { Skeleton } from "@comps";

export default function Loading() {
  return (
    <div className="my-20">
      <Skeleton loop={2} />
    </div>
  );
}
