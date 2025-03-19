import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { BackgroundId } from "@/lib/backgrounds";
import { cn } from "@/lib/utils";
import Link from "next/link";

type LessonPlanCardProps = {
  id: string;
  background: BackgroundId | null;
  name: string | null;
};

export const LessonPlanCard = ({
  id,
  name,
  background,
}: LessonPlanCardProps) => {
  return (
    <Link
      href={`/dashboard/${id}`}
      className="w-96 transition-all duration-200 ease-in-out hover:scale-[1.02]"
    >
      <Card>
        <div
          className={cn(
            "relative h-48 w-full overflow-hidden rounded-t-xl",
            !!background && background,
            { "bg-neutral-400": !background },
          )}
        />
        <CardHeader>
          <CardTitle>{name ?? "Untitled Lesson Plan"}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};
