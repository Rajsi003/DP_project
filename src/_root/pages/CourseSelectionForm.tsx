
// import * as React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// //import courseData from "../../assets/courseList.json";
// interface Course {
//   course_code: string;
//   course_name: string;
//   instructor_name: string;
//   instructor_id: string;
//   avail: string;
//   dcfor: string[];
//   defor: string[];
//   icornot: string;
//   slot: string;
//   credit: number;
//   ltpc: string;
// }

// interface Student {
//   roll_no: string;
//   student_name: string;
//   student_branch_code: string;
// }

// const maxCreditLimit = 22;
// const minCreditLimit = 4;
// const slots = ["A", "B", "C", "D", "E", "F", "FS"];

// // const getCoursesForSlot = (slot) => {
// //   return courseData.courses.filter(
// //     (course) =>
// //       course.slot === slot &&
// //       course.availability === "valid" &&
// //       (course.dcfor.includes(userBranch) ||
// //         course.dcfor.includes("All") ||
// //         course.defor.includes(userBranch) ||
// //         course.defor.includes("All"))
// //   );
// // };

// const CourseSelectionForm = () => {
//   const [selectedCourses, setSelectedCourses] = useState<Record<string, any>>({});
//   const [showPopup, setShowPopup] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const navigate = useNavigate();

//   const totalCredits = Object.values(selectedCourses).reduce(
//     (sum, course) => sum + (course && course.credit ? parseInt(course.credit, 10) : 0),
//     0
//   );

//   const handleCourseSelect = (slot: string, courseCode: string) => {
//     setErrors((prev) => ({ ...prev, [slot]: "" }));
//     if (courseCode === "none") {
//       setSelectedCourses((prev) => ({ ...prev, [slot]: "none" }));
//     } else {
//       const selectedCourse = courseData.courses.find(
//         (course) => course.course_code === courseCode
//       );
//       setSelectedCourses((prev) => ({ ...prev, [slot]: selectedCourse || null }));
//     }
//   };

//   const validateSelection = () => {
//     const newErrors: Record<string, string> = {};
//     slots.forEach((slot) => {
//       if (!selectedCourses[slot]) {
//         newErrors[slot] = `No course selected for Slot ${slot}`;
//       }
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (validateSelection() && totalCredits >= minCreditLimit && totalCredits <= maxCreditLimit) {
//       setShowPopup(true);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <Card className="w-[750px]">
//         <CardHeader>
//           <CardTitle className="text-4xl">Course Registration</CardTitle>
//           <CardDescription className="text-red-500">
//             *Last day for course registration is 15-08-2025
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form>
//             <div className="grid w-full items-center gap-4">
//               {slots.map((slot) => {
//                 const slotCourses = getCoursesForSlot(slot);
//                 return (
//                   <div key={slot} className="flex flex-col space-y-1.5">
//                     <Label htmlFor={`slot-${slot}`}>Slot-{slot}</Label>
//                     <Select onValueChange={(value) => handleCourseSelect(slot, value)}>
//                       <SelectTrigger id={`slot-${slot}`}>
//                         <SelectValue placeholder={`Select a course for Slot ${slot}`} />
//                       </SelectTrigger>
//                       <SelectContent position="popper">
//                         {slotCourses.length > 0 ? (
//                           <>
//                             {slotCourses.map((course) => (
//                               <SelectItem key={course.course_code} value={course.course_code}>
//                                 {course.course_name} ({course.course_code})
//                               </SelectItem>
//                             ))}
//                             <SelectItem value="none">None</SelectItem>
//                           </>
//                         ) : (
//                           <SelectItem value="none">None</SelectItem>
//                         )}
//                       </SelectContent>
//                     </Select>
//                     {errors[slot] && selectedCourses[slot] !== "none" && (
//                       <p className="text-red-500 text-sm">{errors[slot]}</p>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//             <p className="mt-4 text-lg font-semibold">Total Credits: {totalCredits}</p>
//             {totalCredits > maxCreditLimit && (
//               <p className="text-red-500 mt-2">Maximum credit limit exceeded! (Max: {maxCreditLimit})</p>
//             )}
//             {totalCredits < minCreditLimit && (
//               <p className="text-red-500 mt-2">Minimum credit limit not reached! (Min: {minCreditLimit})</p>
//             )}
//           </form>
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <Button>Save</Button>
//           <Button disabled={totalCredits > maxCreditLimit || totalCredits < minCreditLimit} onClick={handleSubmit}>
//             Submit
//           </Button>
//         </CardFooter>
//       </Card>
//       {showPopup && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//           <Card className="w-[400px]">
//             <CardHeader>
//               <CardTitle>Confirm Submission</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-red-500">You will not be able to edit your course selection for this semester after this. Are you sure you'd like to proceed?</p>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Button onClick={() => setShowPopup(false)}>Back</Button>
//               <Button onClick={() => navigate("/thanku")}>
//                 Proceed
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseSelectionForm;




import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Course {
  course_code: string;
  course_name: string;
  instructor_name: string;
  instructor_id: string;
  avail: string;
  dcfor: string[];
  defor: string[];
  icornot: string;
  slot: string;
  credit: number;
  ltpc: string;
}

const maxCreditLimit = 22; 
const minCreditLimit = 4;
const slots = ["A", "B", "C", "D", "E", "F", "G", "H", "FS"];
const roll_no = "B23188";
const branch_code = "CS2";

const CourseSelectionForm = () => {
  const [showPopup, setShowPopup] = useState(false);
   const [errors, setErrors] = useState<Record<string, string>>({});
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<Record<string, Course | "none">>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost:5001/available-courses/${branch_code}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Total Credits Selected:", totalCredits);
        
        setCourses(validateAndTransformCourses(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const initialSelections: Record<string, Course | "none"> = {};
    slots.forEach((slot) => (initialSelections[slot] = "none"));
    setSelectedCourses(initialSelections);
  }, [courses]);

  const validateAndTransformCourses = (data: any[]): Course[] => {
    return data.map((item) => ({
      course_code: item.course_code || "",
      course_name: item.course_name || "",
      instructor_name: item.instructor_name || "",
      instructor_id: item.instructor_id || "",
      avail: item.avail?.toLowerCase() === "yes" ? "yes" : "no",
      dcfor: Array.isArray(item.dcfor) ? item.dcfor : [],
      defor: Array.isArray(item.defor) ? item.defor : [],
      icornot: item.icornot === "IC" ? "IC" : "Non-IC",
      slot: slots.includes(item.slot) ? item.slot : "A",
      credit: Number(item.credit) || 0,
      ltpc: item.ltpc?.replace(":", "-") || "",
    }));
  };

  const getCoursesForSlot = (slot: string) => {
    return courses.filter(
      (course) =>
        course.slot === slot &&
        course.avail === "yes" &&
        (course.dcfor.includes(branch_code) || course.defor.includes(branch_code) || course.defor.includes("All"))
    );
  };

  const totalCredits = Object.values(selectedCourses).reduce(
    (sum, course) => (course !== "none" && course.credit ? sum + course.credit : sum),
    0
  );
  
const handleCourseSelect = (slot: string, value: string) => {
  if (value === "none") {
    setSelectedCourses((prev) => ({ ...prev, [slot]: "none" }));
  } else {
    const selectedCourse = courses.find((course) => course.course_code === value);
    if (selectedCourse) {
      setSelectedCourses((prev) => {
        console.log(`Selected course for slot ${slot}:`, selectedCourse);
        return { ...prev, [slot]: selectedCourse };
      });
    }
  }
};

const handleSubmit = async () => {
  console.log("Checking total credits before submission:", totalCredits);

  if (totalCredits < minCreditLimit) {
    console.log("Validation failed: Not enough credits");
    setError(`Minimum ${minCreditLimit} credits required`);
    return;
  }
  if (totalCredits > maxCreditLimit) {
    console.log("Validation failed: Too many credits");
    setError(`Maximum ${maxCreditLimit} credits allowed`);
    return;
  }
  setShowPopup(true); 
  try {
    const selectedCoursesData = slots
      .map(slot => selectedCourses[slot])
      .filter(course => course && course !== "none")
      .map(course => ({ course_code: course.course_code, slot: course.slot }));

    if (selectedCoursesData.length === 0) {
      setError("No valid courses selected");
      return;
    }

    const requestBody = {
      roll_no,
      courses: selectedCoursesData,
    };

    console.log("Submitting payload:", JSON.stringify(requestBody, null, 2));

    const response = await fetch("http://localhost:5001/register-courses-final", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(`Failed to register courses. Status: ${response.status}, Response: ${responseText}`);
    }

    const data = await response.json();
    console.log("Course registration successful!", data);
    setError(null); // Clear any errors after successful submission
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to register courses");
  }
};


  

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;

  // return (
  //   <div className="flex justify-center items-center min-h-screen">
  //     <Card className="w-[750px]">
  //       <CardHeader>
  //         <CardTitle className="text-4xl">Course Registration</CardTitle>
  //         <CardDescription>*Last day for registration: 15-08-2025</CardDescription>
  //       </CardHeader>
  //       <CardContent>
  //         {slots.map((slot) => (
  //           <div key={slot} className="mb-4">
  //             <Label htmlFor={`slot-${slot}`}>Slot-{slot}</Label>
  //             <Select onValueChange={(value) => handleCourseSelect(slot, value)}>
  //               <SelectTrigger>
  //                 <SelectValue placeholder={`Select a course for Slot ${slot}`} />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="none">None</SelectItem>
  //                 {getCoursesForSlot(slot).map((course) => (
  //                   <SelectItem key={course.course_code} value={course.course_code}>
  //                     {course.course_name} ({course.course_code}) - {course.credit} credits
  //                   </SelectItem>
  //                 ))}
  //               </SelectContent>
  //             </Select>
  //           </div>
  //         ))}
  //         <Button onClick={handleSubmit}>Submit</Button>
  //       </CardContent>
  //     </Card>
  //   </div>
  // );
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[750px]">
        <CardHeader>
          <CardTitle className="text-4xl">Course Pre-Registration</CardTitle>
          <CardDescription className="text-red-500">
            *Last day for course pre-registration is 15-08-2025
          </CardDescription>
        </CardHeader>
  
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              {slots.map((slot) => {
                const slotCourses = getCoursesForSlot(slot);
                return (
                  <div key={slot} className="flex flex-col space-y-1.5">
                    <Label htmlFor={`slot-${slot}`}>Slot-{slot}</Label>
                    <Select onValueChange={(value) => handleCourseSelect(slot, value)}>
                      <SelectTrigger id={`slot-${slot}`}>
                        <SelectValue placeholder={`Select a course for Slot ${slot}`} />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {slotCourses.length > 0 ? (
                          <>
                            {slotCourses.map((course) => (
                              <SelectItem key={course.course_code} value={course.course_code}>
                                {course.course_name} ({course.course_code}) - {course.credit} credits
                              </SelectItem>
                            ))}
                            <SelectItem value="none">None</SelectItem>
                          </>
                        ) : (
                          <SelectItem value="none">None</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {errors[slot] && selectedCourses[slot] !== "none" && (
                      <p className="text-red-500 text-sm">{errors[slot]}</p>
                    )}
                  </div>
                );
              })}
            </div>
  
            <p className="mt-4 text-lg font-semibold">Total Credits: {totalCredits}</p>
  
            {totalCredits > maxCreditLimit && (
              <p className="text-red-500 mt-2">Maximum credit limit exceeded! (Max: {maxCreditLimit})</p>
            )}
            {totalCredits < minCreditLimit && (
              <p className="text-red-500 mt-2">Minimum credit limit not reached! (Min: {minCreditLimit})</p>
            )}
          </form>
        </CardContent>
  
        <CardFooter className="flex justify-between">
         
          <Button
            disabled={totalCredits > maxCreditLimit || totalCredits < minCreditLimit}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
  
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Confirm Submission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-500">
                You will not be able to edit your course selection for this semester after this.
                Are you sure you'd like to proceed?
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => setShowPopup(false)}>Back</Button>
              <Button onClick={() => navigate("/thanku")}>Proceed</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
  
};

export default CourseSelectionForm;
