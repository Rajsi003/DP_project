import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Course = { 
  course_code: string; 
  course_name: string;
  students?: Student[]; // Optional because it's nested from backend
};
type Student = {
    id: number; // ✅ Add this
    roll_no: string;
    student_name: string;
    branch: string;
    status: string;
  };

const InstructorPreReg = () => {
  const { id } = useParams<{ id: string }>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [studentsByCourse, setStudentsByCourse] = useState<Record<string, Student[]>>({});

  useEffect(() => {
    // Change background color of the entire page to black
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white"; // Make text white for visibility

    // Fetch courses which already include students
    fetch(`http://localhost:5001/instructor/${id}/courses`)
      .then((res) => res.json())
      .then((data: Course[]) => {
        console.log("Fetched courses:", data);
        setCourses(data);
        // Build a map of students keyed by course_code
        const studentsMap: Record<string, Student[]> = {};
        data.forEach((course) => {
          // Use the nested 'students' property, defaulting to an empty array if not present
          studentsMap[course.course_code] = course.students || [];
        });
        setStudentsByCourse(studentsMap);
      })
      .catch((error) => console.error("Error fetching courses:", error));

    // Cleanup function to reset background color when component unmounts
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, [id]);

  const handleStatusChange = (
    course_code: string,
    roll_no: string,
    newStatus: string
  ) => {
    setStudentsByCourse((prev) => ({
      ...prev,
      [course_code]: prev[course_code].map((student) =>
        student.roll_no === roll_no ? { ...student, status: newStatus } : student
      ),
    }));
  };

  const saveChanges = async (course_code: string) => {
    const updates = studentsByCourse[course_code]
      .filter((s) => s.status !== "pending") // Only update if status changed
      .map(({ id, status }) => ({ id, status }));
  
    try {
      for (const { id, status } of updates) {
        const res = await fetch(`http://localhost:5001/coursepreregistration/${id}/status`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
  
        if (!res.ok) {
          throw new Error(`Failed to update student with prereg ID ${id}`);
        }
      }
  
      alert("Changes saved!");
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to save changes");
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue={courses[0]?.course_code} className="w-[700px] p-6">
        <TabsList className="grid grid-cols-2">
          {courses.map((course) => (
            <TabsTrigger key={course.course_code} value={course.course_code}>
              {course.course_code}
            </TabsTrigger>
          ))}
        </TabsList>

        {courses.map((course) => (
          <TabsContent key={course.course_code} value={course.course_code}>
            <Card>
              <CardHeader>
                <CardTitle>{course.course_name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studentsByCourse[course.course_code]?.length ? (
                  studentsByCourse[course.course_code].map((student) => (
                    <div key={student.roll_no} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {student.student_name} ({student.roll_no})
                        </p>
                        <p className="text-sm text-muted-foreground">{student.branch}</p>
                      </div>
                      <Select
                        value={student.status}
                        onValueChange={(value) =>
                          handleStatusChange(course.course_code, student.roll_no, value)
                        }
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="accepted">Accepted</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))
                ) : (
                  <p>No students registered for this course.</p>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={() => saveChanges(course.course_code)}>
                  Save changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default InstructorPreReg;
