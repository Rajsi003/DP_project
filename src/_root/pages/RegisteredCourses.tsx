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
  
  const RegisteredCourses= () => {
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
  
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(
            `http://localhost:5001/registered-courses/${rollNo}`
          );
          const json = await res.json();
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
  
      </div>
    );
  };
  
  export default RegisteredCourses;
  