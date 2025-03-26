"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAppForm } from "@/hooks/use-app-form";
import { durations } from "@/lib/timetables/durations";
import {
  type CreateTimetable,
  createTimetableSchema,
} from "./create-timetable-schema";

export default function Page() {
  const { AppField } = useAppForm({
    defaultValues: {
      name: "",
      duration: "",
    } as CreateTimetable,
    validators: {
      onChange: createTimetableSchema,
    },
  });

  return (
    <div className="p-8 container mx-auto flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Timetable</h1>
        <p className="text-muted-foreground">
          Add a new timetable to your class.
        </p>
      </div>
      <Separator />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AppField name="name">
          {(Field) => <Field.Input label="Timetable Name" />}
        </AppField>

        <AppField name="duration">
          {(Field) => (
            <Field.Select label="Duration (weeks)">
              <SelectTrigger className="w-full" id="timetable-duration">
                <SelectValue defaultValue="10" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-64">
                  {durations.map((d) => (
                    <SelectItem key={`week-${d}`} value={`${d}`}>
                      {d}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Field.Select>
          )}
        </AppField>

        <AppField name="startDate">
          {(Field) => <Field.DatePicker label="Start Date" />}
        </AppField>

        <AppField name="endDate">
          {(Field) => <Field.DatePicker label="End Date" />}
        </AppField>
      </div>
    </div>
  );
}
