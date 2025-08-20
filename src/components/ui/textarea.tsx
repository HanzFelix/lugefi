import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-cpurple focus:border-cyellow text-cmono-75 focus:bg-cmono-25 placeholder:text-cmono-50 flex-1 border-l-2 py-1 pl-2 focus:outline-0",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
