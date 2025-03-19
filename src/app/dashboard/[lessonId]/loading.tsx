import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex h-full w-full flex-col gap-12">
      <Skeleton className="relative h-64 w-full" />
      <div className="container mx-auto mt-4 space-y-4 px-4">
        <div className="group flex flex-col gap-2">
          <Textarea
            className="line-clamp-1 min-h-0 resize-none appearance-none overflow-hidden truncate border-none p-0 !text-4xl font-bold shadow-none outline-none focus:outline-none focus-visible:ring-0"
            rows={1}
            disabled
            placeholder="Loading your lesson plan..."
          />
        </div>
        <div className="grid place-items-center">
          <Loader2 className="h-16 w-16 animate-spin" />
        </div>
      </div>
    </div>
  );
}
