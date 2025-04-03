import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


export type Course = {
    id: string;
    course_code: string;
    course_name: string;
    instructor_name: string;
    instructor_id: string;
    avail: string;
    dcfor: string[]; // Assuming it's stored as an array
    defor: string[];
    icornot: string;
    slot: string;
    credit: number;
    ltpc: string;
  };

export const columns: ColumnDef<Course>[] = [
    {
      accessorKey: "course_code",
      header: "Course Code",
      cell: ({ row }) => <div>{row.getValue("course_code")}</div>,
    },
    {
      accessorKey: "course_name",
      header: "Course Name",
      cell: ({ row }) => <div>{row.getValue("course_name")}</div>,
    },
    {
      accessorKey: "instructor_name",
      header: "Instructor Name",
      cell: ({ row }) => <div>{row.getValue("instructor_name")}</div>,
    },
    {
      accessorKey: "instructor_id",
      header: "Instructor ID",
      cell: ({ row }) => <div>{row.getValue("instructor_id")}</div>,
    },
    {
      accessorKey: "avail",
      header: "Availability",
      cell: ({ row }) => <div>{row.getValue("avail")}</div>,
    },
    {
      accessorKey: "dcfor",
      header: "DC For",
      cell: ({ row }) => {
        const dcforValue = row.getValue("dcfor");
        return <div>{Array.isArray(dcforValue) ? dcforValue.join(", ") : String(dcforValue)}</div>;
      },
    },
    {
      accessorKey: "defor",
      header: "DE For",
      cell: ({ row }) => {
        const deforValue = row.getValue("defor");
        return <div>{Array.isArray(deforValue) ? deforValue.join(", ") : String(deforValue)}</div>;
      },
    },
    
    {
      accessorKey: "icornot",
      header: "IC or Not",
      cell: ({ row }) => <div>{row.getValue("icornot")}</div>,
    },
    {
      accessorKey: "slot",
      header: "Slot",
      cell: ({ row }) => <div>{row.getValue("slot")}</div>,
    },
    {
      accessorKey: "credit",
      header: "Credit",
      cell: ({ row }) => <div>{row.getValue("credit")}</div>,
    },
    {
      accessorKey: "ltpc",
      header: "LTPC",
      cell: ({ row }) => <div>{row.getValue("ltpc")}</div>,
    },
    {
      id: "actions",
      header:"Actions",
      cell: ({ row }) => {
        const course = row.original;
  
        const deleteCourse = async (id: string) => {
          const isConfirmed = window.confirm("Are you sure you want to permanently delete this course?");
          
          if (!isConfirmed) return; 
        
          try {
            const response = await fetch(`http://localhost:5001/courses/${id}`, {
              method: "DELETE",
            });
        
            if (response.ok) {
              window.location.reload();
              alert("Course has been deleted successfully!");
            } else {
              alert("Failed to delete course.");
            }
          } catch (error) {
            console.error("Error deleting course:", error);
          }
        };
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => (window.location.href = `/edit-course/${course.course_code}`)}>


                Edit Course
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteCourse(course.course_code)}>
                Delete Course
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

// const AllCourses = () => {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
//   const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
//   const [rowSelection, setRowSelection] = React.useState({});
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [globalFilter, setGlobalFilter] = useState("");
  
//   const getCourses = async () => {
//     try {
//       const response = await fetch("http://localhost:5001/courses");
//       const jsonData = await response.json();
//       setCourses(jsonData);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   };

//   useEffect(() => {
//     getCourses();
//   }, []);

//   useEffect(() => {
//     // Set column filters when searchTerm changes
//     setColumnFilters([
//       {
//         id: "course_code",
//         value: searchTerm,
//       },
//       {
//         id: "course_name",
//         value: searchTerm,
//       },
//     ]);
//   }, [searchTerm]);

//   const filteredData = React.useMemo(() => {
//     if (!globalFilter) return courses;
    
//     const lowerFilter = globalFilter.toLowerCase();
//     return courses.filter(
//       (course) =>
//         course.course_code.toLowerCase().includes(lowerFilter) ||
//         course.course_name.toLowerCase().includes(lowerFilter) ||
//         course.instructor_name.toLowerCase().includes(lowerFilter)
//     );
//   }, [courses, globalFilter]);




//   const table = useReactTable({
//     data: filteredData,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });
const AllCourses = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getCourses = async () => {
    try {
      const response = await fetch("http://localhost:5001/courses");
      const jsonData = await response.json();
      setCourses(jsonData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const filteredData = React.useMemo(() => {
    if (!searchTerm) return courses;
    
    const lowerFilter = searchTerm.toLowerCase();
    return courses.filter(
      (course) =>
        course.course_code.toLowerCase().includes(lowerFilter) ||
        course.course_name.toLowerCase().includes(lowerFilter) ||
        (course.instructor_name && course.instructor_name.toLowerCase().includes(lowerFilter))
    );
  }, [courses, searchTerm]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });



  const navigate = useNavigate();

  return (
    <div className="mt-10 ml-10 mr-10 mb-10 justify-center items-center min-h-screen">
      <div className="flex items-center py-4 space-x-4">
        <Input
          placeholder="Search by course code or name..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Visible <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuItem key={column.id} className="capitalize">
                  <Checkbox
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    aria-label={`Toggle visibility of ${column.id}`}
                  />
                  {column.id}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-black">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button onClick={() => navigate("/add-course")}>Add Course</Button>
      </div>
    </div>
  );
};

export default AllCourses; 