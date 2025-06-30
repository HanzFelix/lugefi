import { Skeleton } from "@/components/ui/skeleton";

export default async function LoadingPost() {
  return (
    <div className="container mx-auto flex flex-col gap-4 px-4 md:flex-row">
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <Skeleton className="float-right ml-2 block aspect-2/3 w-24 md:hidden" />
          <div>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="mt-2 h-2 w-1/3" />
            <div className="my-4">
              <Skeleton className="text-cmono-100 mb-2 h-6 w-1/2" />
              <Skeleton className="text-cmono-100 h-6 w-1/2" />
            </div>
          </div>
        </div>
        <Skeleton className="h-6 w-full" />
      </div>
      <div className="w-full md:w-1/3 lg:w-1/4">
        <Skeleton className="hidden aspect-2/3 w-full md:block" />
      </div>
    </div>
  );
}
