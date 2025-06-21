///display all registered courses course-wise


// import React, { useEffect, useState } from "react"
// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   ColumnDef,
// } from "@tanstack/react-table"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { Input } from "@/components/ui/input"

// import { Button } from "@/components/ui/button"
// type Course = {
//   id: string
//   course_code: string
//   course_name: string
//   instructor_name: string
//   type: string // DC / DE / IC
//   slot: string
//   credit: number
//   ltpc: string
//   priority: number
//   status: string
// }

// const CourseTable = () => {
//   const rollNo = "B23188"; // Example: Replace with dynamic value if needed

//   const [data, setData] = useState<Course[]>([])
//   const [loading, setLoading] = useState(true)
//   const [filter, setFilter] = useState("")
//   const [tempPriorities, setTempPriorities] = useState<Record<string, string>>({});
//   const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>, courseId: string) => {
//     const newPriority = e.target.value;
//     setTempPriorities((prev) => ({
//       ...prev,
//       [courseId]: newPriority,
//     }));
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("http://localhost:5001/coursepreregistration/B23188")
//         const json = await res.json()
//         setData(json)
//       } catch (err) {
//         console.error("Failed to fetch courses", err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])
//   const columns: ColumnDef<Course>[] = [
//     {
//       accessorKey: "course_code",
//       header: "Course Code",
//       cell: ({ row }) => <div>{row.getValue("course_code")}</div>,
//     },
//     {
//       accessorKey: "course_name",
//       header: "Course Name",
//       cell: ({ row }) => <div>{row.getValue("course_name")}</div>,
//     },
//     {
//       accessorKey: "instructor_name",
//       header: "Instructor",
//       cell: ({ row }) => <div>{row.getValue("instructor_name")}</div>,
//     },
//     {
//       accessorKey: "type",
//       header: "Type",
//       cell: ({ row }) => (
//         <div className="font-medium text-primary">{row.getValue("type")}</div>
//       ),
//     },
//     {
//       accessorKey: "slot",
//       header: "Slot",
//       cell: ({ row }) => <div>{row.getValue("slot")}</div>,
//     },
//     {
//       accessorKey: "credit",
//       header: "Credits",
//       cell: ({ row }) => <div>{row.getValue("credit")}</div>,
//     },
//     {
//       accessorKey: "ltpc",
//       header: "LTPC",
//       cell: ({ row }) => <div>{row.getValue("ltpc")}</div>,
//     },
//     {
//       accessorKey: "status",
//       header: "Status",
//       cell: ({ row }) => {
//         const status = row.getValue("status") as string
//         const baseClass =
//           "px-3 py-1 rounded-full text-sm font-medium w-fit capitalize"

//         const statusColor =
//           status === "pending"
//             ? "bg-yellow-100 text-yellow-800"
//             : status === "accepted"
//             ? "bg-green-100 text-green-800"
//             : "bg-red-100 text-red-800"

//         return <div className={`${baseClass} ${statusColor}`}>{status}</div>
//       },},
//       {
//         accessorKey: "priority",
//         header: "Priority",
//         cell: ({ row }) => {
//           const course = row.original;
//           const { status, slot } = course;

//           if (status === "rejected") return null;

//           const acceptedCoursesInSlot = data.filter(
//             (c) => c.slot === slot && c.status === "accepted"
//           ).length;

//           const priorityOptions =
//             acceptedCoursesInSlot >= 4
//               ? ["1", "2", "3", "DRP"]
//               : ["1", "2", "3"].slice(0, acceptedCoursesInSlot);

//           if (status === "accepted") {
//             const selectedValue = tempPriorities[course.id] ?? (course.priority > 0 ? course.priority.toString() : "DRP");

//             return (
//               <select
//                 value={selectedValue}
//                 onChange={(e) => {
//                   const newPriority = e.target.value;
//                   setTempPriorities((prev) => ({
//                     ...prev,
//                     [course.id]: newPriority,
//                   }));
//                 }}
//                 className="border rounded px-2 py-1"
//               >
//                 {priorityOptions.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             );
//           }

//           return <div>1</div>;
//         },
//       }

//   ]
//   const filteredData = data.filter((course) =>
//     course.course_code.toLowerCase().includes(filter.toLowerCase()) ||
//     course.course_name.toLowerCase().includes(filter.toLowerCase())
//   )

//   const table = useReactTable({
//     data: filteredData,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   })

//   if (loading) return <div className="p-4 text-muted-foreground">Loading...</div>
//   const handleSubmit = async () => {
//     const priorities = data
//       .filter((course) => course.status === "accepted")
//       .map(({ id, course_code, slot, priority }) => ({
//         course_code,
//         slot,
//         priority: tempPriorities[id] ? parseInt(tempPriorities[id], 10) : priority,
//       }));

//     try {
//       const res = await fetch(
//         `http://localhost:5001/coursepreregistration/priority/${rollNo}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ priorities }),
//         }
//       );

//       const json = await res.json();
//       if (res.ok) {
//         alert("Priorities submitted successfully!");
//       } else {
//         alert("Failed to submit: " + (json.message || "Unknown error"));
//       }
//     } catch (err) {
//       console.error("Error submitting priorities", err);
//       alert("An error occurred while submitting priorities.");
//     }
//   };

//   return (
//     <div className="w-full p-4 space-y-4">

//       <div className="rounded-md border overflow-x-auto">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow key={row.id}>
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} className="text-center">
//                   No matching courses found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex justify-end">
//   <Button onClick={handleSubmit} className="mt-4">
//     Submit Priorities
//   </Button>
// </div>

//     </div>
//   )
// }

// export default CourseTable
// "use client"

// import * as React from "react"
// import { Button } from "@/components/ui/button"

// const CourseTable = () => {
//   const rollNo = "B23188"; // Example: Replace with dynamic value if needed
//   const [data, setData] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const [filter, setFilter] = React.useState("");
//   const [tempPriorities, setTempPriorities] = React.useState<Record<string, string>>({});
//   const [slotAcceptedCount, setSlotAcceptedCount] = React.useState<Record<string, number>>({});

//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`http://localhost:5001/coursepreregistration/${rollNo}`);
//         const json = await res.json();
//         setData(json);

//         // Calculate the number of accepted courses per slot
//         const slotCounts: Record<string, number> = {};
//         json.forEach((course: any) => {
//           if (course.status === "accepted") {
//             slotCounts[course.slot] = (slotCounts[course.slot] || 0) + 1;
//           }
//         });
//         setSlotAcceptedCount(slotCounts);

//       } catch (err) {
//         console.error("Failed to fetch courses", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [rollNo]);

//   const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>, courseId: string) => {
//     const newPriority = e.target.value;
//     setTempPriorities((prev) => ({
//       ...prev,
//       [courseId]: newPriority,
//     }));
//   };

//   const filteredData = data.filter((course) =>
//     course.course_code.toLowerCase().includes(filter.toLowerCase()) ||
//     course.course_name.toLowerCase().includes(filter.toLowerCase())
//   );

//   if (loading) return <div className="p-4 text-muted-foreground">Loading...</div>;

//   return (
//     <div className="w-full p-4 space-y-4">

//       {/* Course Table */}
//       <div className="rounded-md border overflow-x-auto">
//         <table className="min-w-full table-auto">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="px-4 py-2">Course Code</th>
//               <th className="px-4 py-2">Course Name</th>
//               <th className="px-4 py-2">Instructor</th>
//               <th className="px-4 py-2">Type</th>
//               <th className="px-4 py-2">Slot</th>
//               <th className="px-4 py-2">Credits</th>
//               <th className="px-4 py-2">LTPC</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Priority</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length ? (
//               filteredData.map((course) => (
//                 <tr key={course.id} className="odd:bg-gray-50 even:bg-white">
//                   <td className="px-4 py-2">{course.course_code}</td>
//                   <td className="px-4 py-2">{course.course_name}</td>
//                   <td className="px-4 py-2">{course.instructor_name}</td>
//                   <td className="px-4 py-2">{course.type}</td>
//                   <td className="px-4 py-2">{course.slot}</td>
//                   <td className="px-4 py-2">{course.credit}</td>
//                   <td className="px-4 py-2">{course.ltpc}</td>
//                   <td className="px-4 py-2">
//                     <div
//                       className={`px-3 py-1 rounded-full text-sm font-medium w-fit capitalize ${
//                         course.status === "pending"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : course.status === "accepted"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {course.status}
//                     </div>
//                   </td>
//                   <td className="px-4 py-2">
//   {course.status === "rejected" ? (
//     <div>-</div>
//   ) : (
//     // Check if there are more than one course in the slot before showing the priority dropdown
//     slotAcceptedCount[course.slot] > 1 ? (
//       <select
//         value={tempPriorities[course.id] ?? ""}
//         onChange={(e) => handlePriorityChange(e, course.id)}
//         className="border rounded px-2 py-1"
//       >
//         <option value="">Select Priority</option>
//         {[...Array(slotAcceptedCount[course.slot] || 0)].map((_, index) => (
//           <option key={index} value={index + 1}>
//             {index + 1}
//           </option>
//         ))}
//       </select>
//     ) : (
//       <div>-</div> // No need to show the priority dropdown if there's only one course in the slot
//     )
//   )}
// </td>

//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={9} className="text-center px-4 py-2">
//                   No matching courses found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-end">
//         <Button onClick={() => console.log(tempPriorities)} className="mt-4">
//           Submit Priorities
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default CourseTable;
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import * as React from "react";
import { Button } from "@/components/ui/button";

const CourseTable = () => {
  const rollNo = "B23188"; // Example: Replace with dynamic value if needed
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState("");
  const [showPopup, setShowPopup] = React.useState(false);

  const [tempPriorities, setTempPriorities] = React.useState<
    Record<string, string>
  >({});
  const [slotAcceptedCount, setSlotAcceptedCount] = React.useState<
    Record<string, number>
  >({});
  const [error, setError] = React.useState<string | null>(null);

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(
  //         `http://localhost:5001/coursepreregistration/${rollNo}`
  //       );
  //       const json = await res.json();
  //       setData(json);

  //       // Calculate the number of accepted courses per slot
  //       const slotCounts: Record<string, number> = {};
  //       json.forEach((course: any) => {
  //         if (course.status === "accepted") {
  //           slotCounts[course.slot] = (slotCounts[course.slot] || 0) + 1;
  //         }
  //       });
  //       setSlotAcceptedCount(slotCounts);
  //     } catch (err) {
  //       console.error("Failed to fetch courses", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [rollNo]);

  // const handlePriorityChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>,
  //   courseId: string
  // ) => {
  //   const newPriority = e.target.value;
  //   setTempPriorities((prev) => ({
  //     ...prev,
  //     [courseId]: newPriority,
  //   }));
  // };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/coursepreregistration/${rollNo}`
        );
        const json = await res.json();
        // Set 'dc' status to 'accepted' by default
        json.forEach((course: any) => {
          if (course.status === "dc") {
            course.status = "accepted"; // Change 'dc' to 'accepted'
          }
        });
        setData(json);
  
        // Calculate the number of accepted courses per slot
        const slotCounts: Record<string, number> = {};
        json.forEach((course: any) => {
          if (course.status === "accepted") {
            slotCounts[course.slot] = (slotCounts[course.slot] || 0) + 1;
          }
        });
        setSlotAcceptedCount(slotCounts);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [rollNo]);
  

  const filteredData = data.filter(
    (course) =>
      course.course_code.toLowerCase().includes(filter.toLowerCase()) ||
      course.course_name.toLowerCase().includes(filter.toLowerCase())
  );

  const getEligibleCourses = () => {
    return data.filter(
      (course) =>
        course.status === "accepted" && slotAcceptedCount[course.slot] > 1
    );
  };

  const checkForErrors = () => {
    const eligibleCourses = getEligibleCourses();

    // 1. Check if all priorities are selected
    for (let course of eligibleCourses) {
      if (!tempPriorities[course.id]) {
        return "Fill all priorities";
      }
    }

    // 2. Check for duplicate priorities in the same slot
    const prioritiesBySlot: Record<string, Record<string, string>> = {};
    for (let course of eligibleCourses) {
      const slot = course.slot;
      const priority = tempPriorities[course.id];
      if (!prioritiesBySlot[slot]) prioritiesBySlot[slot] = {};
      if (Object.values(prioritiesBySlot[slot]).includes(priority)) {
        return "You cannot keep different courses at same priorities";
      }
      prioritiesBySlot[slot][course.id] = priority;
    }

    // No errors
    return null;
  };

  const errorMessage = checkForErrors();

  if (loading)
    return <div className="p-4 text-muted-foreground">Loading...</div>;

  return (
    <div className="w-full p-4 space-y-4">
      {/* Course Table */}
      <div className="rounded-md border overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Course Code</th>
              <th className="px-4 py-2">Course Name</th>
              <th className="px-4 py-2">Instructor</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Slot</th>
              <th className="px-4 py-2">Credits</th>
              <th className="px-4 py-2">LTPC</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Priority</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length ? (
              filteredData.map((course) => (
                <tr key={course.id} className="odd:bg-gray-50 even:bg-white">
                  <td className="px-4 py-2">{course.course_code}</td>
                  <td className="px-4 py-2">{course.course_name}</td>
                  <td className="px-4 py-2">{course.instructor_name}</td>
                  <td className="px-4 py-2">{course.type}</td>
                  <td className="px-4 py-2">{course.slot}</td>
                  <td className="px-4 py-2">{course.credit}</td>
                  <td className="px-4 py-2">{course.ltpc}</td>
                  <td className="px-4 py-2">
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium w-fit capitalize ${
                        course.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : course.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {course.status}
                    </div>
                  </td>
                  {/* <td className="px-4 py-2">
                    {course.status === "rejected" ? (
                      <div>-</div>
                    ) : // Check if there are more than one course in the slot before showing the priority dropdown
                    slotAcceptedCount[course.slot] > 1 ? (
                      <select
                        value={tempPriorities[course.id] ?? ""}
                        onChange={(e) => handlePriorityChange(e, course.id)}
                        className="border rounded px-2 py-1"
                      >
                        <option value="">Select Priority</option>
                        {[...Array(slotAcceptedCount[course.slot] || 0)].map(
                          (_, index) => (
                            <option key={index} value={index + 1}>
                              {index + 1}
                            </option>
                          )
                        )}
                      </select>
                    ) : (
                      <div>-</div> // No need to show the priority dropdown if there's only one course in the slot
                    )}
                  </td> */}
                  <td className="px-4 py-2">
  {course.status === "rejected" ? (
    <div>-</div>
  ) : course.status === "dc" ? (
    // Don't show priority for courses with "dc" status
    <div>-</div>
  ) : slotAcceptedCount[course.slot] > 1 ? (
    <select
      value={tempPriorities[course.id] ?? ""}
      onChange={(e) => handlePriorityChange(e, course.id)}
      className="border rounded px-2 py-1"
    >
      <option value="">Select Priority</option>
      {[...Array(slotAcceptedCount[course.slot] || 0)].map((_, index) => (
        <option key={index} value={index + 1}>
          {index + 1}
        </option>
      ))}
    </select>
  ) : (
    <div>-</div> // No need to show the priority dropdown if there's only one course in the slot
  )}
</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center px-4 py-2">
                  No matching courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Error Message */}

      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
      {/* <Button
onClick={async () => {
  if (!errorMessage) {
    const eligibleCourses = getEligibleCourses();
    const priorities = eligibleCourses.map((course) => ({
      course_code: course.course_code,
      slot: course.slot,
      priority: parseInt(tempPriorities[course.id]),
    }));

    const payload = { priorities };

    try {
      const res = await fetch("http://localhost:5001/coursepreregistration/priority/B23188", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Priorities submitted successfully!");
      } else {
        const errorData = await res.json();
        alert("Failed to submit priorities: " + errorData.message);
      }
    } catch (error) {
      console.error("Error submitting priorities", error);
      alert("Something went wrong. Please try again.");
    }
  }
} }

        className="mt-4"
        disabled={!!errorMessage}
      >
        Submit 
      </Button> */}
      <Button
        onClick={() => {
          if (!errorMessage) {
            setShowPopup(true); // show confirmation popup first
          }
        }}
        className="mt-4"
        disabled={!!errorMessage}
      >
        Submit
      </Button>
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Confirm Submission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-500">
                You will not be able to edit your course priorities for this
                semester after this. Are you sure you'd like to proceed?
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="secondary" onClick={() => setShowPopup(false)}>
                Back
              </Button>
              <Button
                onClick={async () => {
                  const eligibleCourses = getEligibleCourses();
                  const priorities = eligibleCourses.map((course) => ({
                    course_code: course.course_code,
                    slot: course.slot,
                    priority: parseInt(tempPriorities[course.id]),
                  }));

                  const payload = { priorities };

                  try {
                    const res = await fetch(
                      "http://localhost:5001/coursepreregistration/priority/B23188",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                      }
                    );

                    if (res.ok) {
                      alert("Priorities submitted successfully!");
                      setShowPopup(false);
                    } else {
                      const errorData = await res.json();
                      alert(
                        "Failed to submit priorities: " + errorData.message
                      );
                    }
                  } catch (error) {
                    console.error("Error submitting priorities", error);
                    alert("Something went wrong. Please try again.");
                  }
                }}
              >
                Proceed
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CourseTable;
