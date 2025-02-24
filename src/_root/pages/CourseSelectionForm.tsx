import * as React from "react";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import courseData from "../../assets/courseList.json";

const userBranch = "DS2";
const maxCreditLimit = 22;
const minCreditLimit = 4;

const getCoursesForSlot = (slot) => {
  return courseData.courses.filter(
    (course) =>
      course.slot === slot &&
      course.availability === "valid" &&
      (course.dcfor.includes(userBranch) ||
        course.dcfor.includes("All") ||
        course.defor.includes(userBranch) ||
        course.defor.includes("All"))
  );
};

const CourseSelectionForm = () => {
  const slots = ["A", "B", "C", "D", "E", "F", "FS"];
  const [selectedCourses, setSelectedCourses] = useState<Record<string, any>>({});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const totalCredits = Object.values(selectedCourses).reduce(
    (sum, course) => sum + (course && course.credit ? parseInt(course.credit, 10) : 0),
    0
  );

  const handleCourseSelect = (slot: string, courseCode: string) => {
    if (courseCode === "none") {
      setSelectedCourses((prev) => {
        const updated = { ...prev };
        delete updated[slot];
        return updated;
      });
    } else {
      const selectedCourse = courseData.courses.find(
        (course) => course.course_code === courseCode
      );
      setSelectedCourses((prev) => ({ ...prev, [slot]: selectedCourse || null }));
    }
  };

  const handleSubmit = () => {
    setShowPopup(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[750px]">
        <CardHeader>
          <CardTitle className="text-4xl">Course Registration</CardTitle>
          <CardDescription className="text-red-500">
            *Last day for course registration is 15-08-2025
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
                                {course.course_name} ({course.course_code})
                              </SelectItem>
                            ))}
                            <SelectItem value="none">None</SelectItem>
                          </>
                        ) : (
                          <SelectItem value="none">None</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
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
          <Button>Save</Button>
          <Button disabled={totalCredits > maxCreditLimit || totalCredits < minCreditLimit} onClick={handleSubmit}>
            Submit
          </Button>
        </CardFooter>
      </Card>
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Confirm Submission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-500">You will not be able to edit your course selection for this semester after this.</p>
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
