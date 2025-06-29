import { Skeleton } from "../ui/skeleton";

export default function CommentsSkeleton() {
  return (
    <div className="mt-4 flex flex-col gap-4 not-empty:mb-4">
      {[...Array(3).keys()].map((i) => (
        <div className="flex w-full gap-2" key={i}>
          <Skeleton className="size-9" />
          <div>
            <Skeleton className="h-full w-1" />
          </div>
          <div className="flex flex-1 flex-col justify-end gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-2 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
