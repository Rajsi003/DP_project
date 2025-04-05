import React, { useEffect, useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

type Course = {
  id: string
  course_code: string
  course_name: string
  instructor_name: string
  type: string // DC / DE / IC
  slot: string
  credit: number
  ltpc: string
}

const columns: ColumnDef<Course>[] = [
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
    header: "Instructor",
    cell: ({ row }) => <div>{row.getValue("instructor_name")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="font-medium text-primary">{row.getValue("type")}</div>
    ),
  },
  {
    accessorKey: "slot",
    header: "Slot",
    cell: ({ row }) => <div>{row.getValue("slot")}</div>,
  },
  {
    accessorKey: "credit",
    header: "Credits",
    cell: ({ row }) => <div>{row.getValue("credit")}</div>,
  },
  {
    accessorKey: "ltpc",
    header: "LTPC",
    cell: ({ row }) => <div>{row.getValue("ltpc")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const baseClass =
        "px-3 py-1 rounded-full text-sm font-medium w-fit capitalize"
  
      const statusColor =
        status === "pending"
          ? "bg-yellow-100 text-yellow-800"
          : status === "accepted"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
  
      return <div className={`${baseClass} ${statusColor}`}>{status}</div>
    },
  },
  
]

const CourseTable = () => {
  const [data, setData] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5001/coursepreregistration/B23181")
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error("Failed to fetch courses", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredData = data.filter((course) =>
    course.course_code.toLowerCase().includes(filter.toLowerCase()) ||
    course.course_name.toLowerCase().includes(filter.toLowerCase())
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (loading) return <div className="p-4 text-muted-foreground">Loading...</div>

  return (
    <div className="w-full p-4 space-y-4">


      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No matching courses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default CourseTable
