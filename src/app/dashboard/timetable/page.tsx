import { buttonVariants } from "@/components/ui/button-variants";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import Link from "next/link";

const mockDataRaw = [
  {
    id: 1,
    name: "Term 1",
    year: 2024,
    duration: 10,
    startDate: "2024-01-22",
    endDate: "2024-03-28",
  },
  {
    id: 2,
    name: "Term 2",
    year: 2024,
    duration: 10,
    startDate: "2024-04-15",
    endDate: "2024-06-21",
  },
  {
    id: 3,
    name: "Term 3",
    year: 2024,
    duration: 10,
    startDate: "2024-07-08",
    endDate: "2024-09-13",
  },
  {
    id: 4,
    name: "Term 4",
    year: 2024,
    duration: 11,
    startDate: "2024-09-30",
    endDate: "2024-12-13",
  },
  {
    id: 5,
    name: "Term 1",
    year: 2025,
    duration: 10,
    startDate: "2025-01-28",
    endDate: "2025-04-04",
  },
];

const mockData = mockDataRaw.sort(
  (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
);

export default function Page() {
  return (
    <div className="flex flex-col gap-4 px-8 pt-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Timetable</h1>
        <Link href={"/dashboard/timetable/1"} className={buttonVariants()}>
          <Plus /> Add
        </Link>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Duration (weeks)</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((row) => (
              <TableRow key={row.id}>
                <TableHead>
                  {row.name} - {row.year}
                </TableHead>
                <TableHead>{row.duration}</TableHead>
                <TableHead>
                  {format(new Date(row.startDate), "dd MMM yyyy")}
                </TableHead>
                <TableHead>
                  {format(new Date(row.endDate), "dd MMM yyyy")}
                </TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
