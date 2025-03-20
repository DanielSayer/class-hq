import "@/styles/full-calendar.css";

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToolbar } from "./useToolbar";
import { MiniCalendar } from "./mini-calendar";

export function Calendar() {
  const [isDayView, setIsDayView] = useState(true);
  const toolbar = useToolbar();

  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className={cn(isDayView ? "lg:w-[calc(100%-20rem)]" : "w-full")}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            locale="en-au"
            nowIndicator
            editable
            selectable
            handleWindowResize
            height={"calc(100vh - 7rem)"}
            scrollTime="08:00:00"
            initialView="timeGridDay"
            datesSet={(args) => {
              setIsDayView(args.view.type === "timeGridDay");
            }}
            views={{
              timeGridThreeDay: {
                type: "timeGrid",
                duration: { days: 3 },
                titleFormat: {
                  month: "short",
                  day: "numeric",
                  separator: " - ",
                },
              },
            }}
            headerToolbar={toolbar}
          />
        </div>

        {isDayView && (
          <Card className="mt-14 hidden lg:block lg:w-80">
            <CardHeader className="pb-2">
              <CardTitle>Quick Navigation</CardTitle>
            </CardHeader>
            <CardContent className="flex w-full justify-center">
              <MiniCalendar />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
