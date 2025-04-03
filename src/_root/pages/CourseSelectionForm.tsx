
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
///////////////////////////2////////////////
// import * as React from "react";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
//   CardFooter,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";


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

// let course: Course | "none" = "none";

// if (course !== "none") {
//   console.log((course as Course).course_code); // ✅ Works, but not ideal
// }

// const maxCreditLimit = 22;
// const minCreditLimit = 4;
// const slots = [  "A", "B", "C", "D", "E", "F", "G", "H", "FS"];

// const roll_no = "B23111";
// const branch_code = "CS2";


// const CourseSelectionForm = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [selectedCourses, setSelectedCourses] = useState<Record<string, Course | "none">>({});
//   const [showPopup, setShowPopup] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     function handleSelectedCourse(selectedData: any) {
//   let course: CourseOrNone = "none";

//   // Ensure selectedData is an array and contains valid courses
//   if (Array.isArray(selectedData) && selectedData.length > 0) {
//     course = selectedData[0]; // Pick the first course as an example
//   }

//   if (course !== "none") {
//     console.log(course.course_code); // ✅ Safe access
//   } else {
//     console.log("No valid course selected.");
//   }
// }

//     const fetchCourses = async () => {
//       try {
//         const response = await fetch(`http://localhost:5001/available-courses/${branch_code}`);

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const text = await response.text();
//         console.log("Raw API Response:", text);

//         if (text.startsWith("<!DOCTYPE html") || text.startsWith("<html")) {
//           throw new Error("Server returned an unexpected response.");
//         }

//         let data;
//         try {
//           data = JSON.parse(text);
//         } catch {
//           throw new Error("Unexpected response format.");
//         }

//         console.log("Parsed API Response:", data);
//         const transformedCourses = validateAndTransformCourses(data);
//         setCourses(transformedCourses);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to fetch courses");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     if (courses.length > 0) {
//       const initialSelections: Record<string, Course | "none"> = {};
//       slots.forEach((slot) => {
//         initialSelections[slot] = "none";
//       });
//       setSelectedCourses(initialSelections);
//     }
//   }, [courses]);

//   const getCoursesForSlot = (slot: string) => {
//     return courses.filter(
//       (course) => {
//         console.log(`Checking course ${course.course_code} with slot ${course.slot} for slot ${slot}`);
//         return (
//           course.slot.trim().toUpperCase() === slot && // Ensure slots match correctly
//           course.avail.toLowerCase() === "yes" && // Ensure course is available
//           (
//             course.dcfor.includes(branch_code) || 
//             course.dcfor.includes("All") || 
//             course.defor.includes(branch_code) || 
//             course.defor.includes("All")
//           )
//         );
//       }
//     );
//   };
  

//   const totalCredits = Object.values(selectedCourses).reduce(
//     (sum, course) => sum + (course && course !== "none" ? course.credit : 0),
//     0
//   );

//   const validateAndTransformCourses = (data: any[]): Course[] => {
//     return data.map((item) => ({
//       course_code: String(item.course_code || ""),
//       course_name: String(item.course_name || ""),
//       instructor_name: String(item.instructor_name || ""),
//       instructor_id: String(item.instructor_id || ""),
//       avail: String(item.avail || "no").toLowerCase() === "yes" ? "yes" : "no",
//       dcfor: Array.isArray(item.dcfor) ? item.dcfor.map(String) : [],
//       defor: Array.isArray(item.defor) ? item.defor.map(String) : [],
//       icornot: item.icornot === "ic" ? "IC" : "Non-IC",
//       slot: slots.includes(item.slot) ? item.slot : "A",
//       credit: Number(item.credit) || 0,
//       ltpc: String(item.ltpc || "").replace(":", "-").replace(/-$/, ""),
//     }));
//   };


//   const validateSelection = () => {
//     const newErrors: Record<string, string> = {};
//     let hasSelection = false;

//     slots.forEach((slot) => {
//       if (!selectedCourses[slot] || selectedCourses[slot] === "none") {
//         newErrors[slot] = `No course selected for Slot ${slot}`;
//       } else {
//         hasSelection = true;
//       }
//     });

//     setErrors(newErrors);
//     return hasSelection && Object.keys(newErrors).length === 0;
//   };
//   const handleCourseSelect = (slot: string, courseCode: string) => {
//     setErrors((prev) => ({ ...prev, [slot]: "" }));
//     if (courseCode === "none") {
//       setSelectedCourses((prev) => ({ ...prev, [slot]: "none" }));
//     } else {
//       const selectedCourse = courses.find((course) => course.course_code === courseCode);
//       if (selectedCourse) {
//         setSelectedCourses((prev) => ({ ...prev, [slot]: selectedCourse }));
//       }
//     }
//   };

//   const handleSubmit = async () => {
//     if (totalCredits < minCreditLimit) {
//       setError(`Minimum ${minCreditLimit} credits required`);
//       return;
//     }
//     if (totalCredits > maxCreditLimit) {
//       setError(`Maximum ${maxCreditLimit} credits allowed`);
//       return;
//     }
//     if (validateSelection()) {
//       try {


//         const selectedData = Object.entries(selectedCourses)
//         .filter(([_, course]) => course !== "none")
//         .map(([_, course]) => ({
//           roll_no,
//           course_code: course.course_code, // Only required columns
//         }));
      
//       const response = await fetch("http://localhost:5001/register-courses", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ courses: selectedData }),
//       });
      
//       console.log(selectedData)
//       console.log("Submitting courses:", selectedData);
  
//         if (!response.ok) {
//           throw new Error(`Failed to register courses. Status: ${response.status}`);
//         }
  
//         console.log("Course registration successful!");
//         setShowPopup(true); // Show confirmation popup
//       } catch (err) {
//         console.error("Error during registration:", err);
//         setError(err instanceof Error ? err.message : "Failed to register courses");
//       }
//     }
//   };
  

//   if (loading) {
//     return <div>Loading courses...</div>;
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Card className="w-[750px]">
//           <CardHeader>
//             <CardTitle className="text-4xl">Error</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-red-500">
//               <p>Error loading course data:</p>
//               <p className="mt-2 font-mono">{error}</p>
//               <p className="mt-4">Please try again later or contact support.</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

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
//                     <Select
//                       onValueChange={(value) => handleCourseSelect(slot, value)}
//                     >
//                       <SelectTrigger id={`slot-${slot}`}>
//                         <SelectValue
//                           placeholder={`Select a course for Slot ${slot}`}
//                         />
//                       </SelectTrigger>
//                       <SelectContent position="popper">
//                         {slotCourses.length > 0 ? (
//                           <>
//                             <SelectItem value="none">None</SelectItem>
//                             {slotCourses.map((course) => (
//                               <SelectItem
//                                 key={course.course_code}
//                                 value={course.course_code}
//                               >
//                                 {course.course_name} ({course.course_code}) -{" "}
//                                 {course.credit} credits
//                               </SelectItem>
//                             ))}
//                           </>
//                         ) : (
//                           <SelectItem value="none">
//                             No available courses for this slot
//                           </SelectItem>
//                         )}
//                       </SelectContent>
//                     </Select>
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
//           <Button variant="outline">Save Draft</Button>
//           <Button
//             disabled={
//               totalCredits > maxCreditLimit || totalCredits < minCreditLimit
//             }
//             onClick={handleSubmit}
//           >
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
  CardFooter,
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
const roll_no = "B23111";
const branch_code = "CS2";

const CourseSelectionForm = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<Record<string, Course | "none">>({});
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost:5001/available-courses/${branch_code}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        console.log("Raw API Response:", text);

        if (text.startsWith("<!DOCTYPE html") || text.startsWith("<html")) {
          throw new Error("Server returned an unexpected response.");
        }

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Unexpected response format.");
        }

        console.log("Parsed API Response:", data);
        const transformedCourses = validateAndTransformCourses(data);
        setCourses(transformedCourses);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      const initialSelections: Record<string, Course | "none"> = {};
      slots.forEach((slot) => {
        initialSelections[slot] = "none";
      });
      setSelectedCourses(initialSelections);
    }
  }, [courses]);

  const getCoursesForSlot = (slot: string) => {
    return courses.filter(
      (course) =>
        course.slot.trim().toUpperCase() === slot &&
        course.avail.toLowerCase() === "yes" &&
        (course.dcfor.includes(branch_code) ||
          course.dcfor.includes("All") ||
          course.defor.includes(branch_code) ||
          course.defor.includes("All"))
    );
  };

  const totalCredits = Object.values(selectedCourses).reduce(
    (sum, course) => sum + (course && course !== "none" ? course.credit : 0),
    0
  );

  const validateAndTransformCourses = (data: any[]): Course[] => {
    return data.map((item) => ({
      course_code: String(item.course_code || ""),
      course_name: String(item.course_name || ""),
      instructor_name: String(item.instructor_name || ""),
      instructor_id: String(item.instructor_id || ""),
      avail: String(item.avail || "no").toLowerCase() === "yes" ? "yes" : "no",
      dcfor: Array.isArray(item.dcfor) ? item.dcfor.map(String) : [],
      defor: Array.isArray(item.defor) ? item.defor.map(String) : [],
      icornot: item.icornot === "ic" ? "IC" : "Non-IC",
      slot: slots.includes(item.slot) ? item.slot : "A",
      credit: Number(item.credit) || 0,
      ltpc: String(item.ltpc || "").replace(":", "-").replace(/-$/, ""),
    }));
  };

  const validateSelection = () => {
    const newErrors: Record<string, string> = {};
    let hasSelection = false;

    slots.forEach((slot) => {
      if (!selectedCourses[slot] || selectedCourses[slot] === "none") {
        newErrors[slot] = `No course selected for Slot ${slot}`;
      } else {
        hasSelection = true;
      }
    });

    setErrors(newErrors);
    return hasSelection && Object.keys(newErrors).length === 0;
  };

  const handleCourseSelect = (slot: string, courseCode: string) => {
    setErrors((prev) => ({ ...prev, [slot]: "" }));
    if (courseCode === "none") {
      setSelectedCourses((prev) => ({ ...prev, [slot]: "none" }));
    } else {
      const selectedCourse = courses.find((course) => course.course_code === courseCode);
      if (selectedCourse) {
        setSelectedCourses((prev) => ({ ...prev, [slot]: selectedCourse }));
      }
    }
  };

  const handleSubmit = async () => {
    if (totalCredits < minCreditLimit) {
      setError(`Minimum ${minCreditLimit} credits required`);
      return;
    }
    if (totalCredits > maxCreditLimit) {
      setError(`Maximum ${maxCreditLimit} credits allowed`);
      return;
    }
    if (validateSelection()) {
      try {
        const selectedData = Object.values(selectedCourses)
          .filter((course) => course !== "none")
          .map((course) => ({
            roll_no,
            course_code: course.course_code,
          }));
          //console.log("Submitting courses:", JSON.stringify({ courses: selectedData }, null, 2));

         console.log("Submitting courses:", selectedData);

        const response = await fetch("http://localhost:5001/register-courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courses: selectedData }),
        });

        if (!response.ok) {
          throw new Error(`Failed to register courses. Status: ${response.status}`);
        }

        console.log("Course registration successful!");
        setShowPopup(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to register courses");
      }
    }
  };

  if (loading) return <div>Loading courses...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[750px]">
        <CardHeader>
          <CardTitle className="text-4xl">Course Registration</CardTitle>
          <CardDescription>*Last day for course registration is 15-08-2025</CardDescription>
        </CardHeader>
        <CardContent>
          {slots.map((slot) => (
            <div key={slot} className="mb-4">
              <Label htmlFor={`slot-${slot}`}>Slot-{slot}</Label>
              <Select onValueChange={(value) => handleCourseSelect(slot, value)}>
                <SelectTrigger>
                  <SelectValue placeholder={`Select a course for Slot ${slot}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {getCoursesForSlot(slot).map((course) => (
                    <SelectItem key={course.course_code} value={course.course_code}>
                      {course.course_name} ({course.course_code}) - {course.credit} credits
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
          <Button onClick={handleSubmit}>Submit</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseSelectionForm;
