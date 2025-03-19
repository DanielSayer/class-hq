import { useIsMobile } from "@/hooks/use-mobile";

export const useToolbar = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return {
      left: "prev,next today",
      right: "title",
    };
  }

  return {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  };
};
