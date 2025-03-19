import type { BackgroundId } from "@/lib/backgrounds";

type CoverProps = {
  background: BackgroundId | null;
};

export const Cover = ({ background }: CoverProps) => {
  if (!background) {
    return null;
  }

  return (
    <div className={`${background} relative h-64 w-full overflow-hidden`} />
  );
};
