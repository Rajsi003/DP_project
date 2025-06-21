import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaClipboardList } from "react-icons/fa";

const Admin = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="p-6">
        <h4 className="text-2xl font-semibold text-white mb-6">Admin Dashboard</h4>

        <div className="grid grid-cols-2 gap-6">
          {/* STUDENT */}
          <Card className="shadow-lg bg-white p-6">
            <CardHeader>
              <CardTitle className="text-center">
                <FaUserGraduate size={40} />
              </CardTitle>
              <CardDescription className="text-center text-lg font-semibold">
                STUDENT
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4"> {/* Ensure flex column layout */}
              <Button onClick={() => navigateTo("/add-student")}>Add Student</Button>
              <Button onClick={() => navigateTo("/delete-student")}>Delete Student</Button>
              <Button onClick={() => navigateTo("/all-students")}>All Students</Button>
            </CardContent>
          </Card>

          {/* INSTRUCTOR */}
          <Card className="shadow-lg bg-white p-6">
            <CardHeader>
              <CardTitle className="text-center">
                <FaChalkboardTeacher size={40} />
              </CardTitle>
              <CardDescription className="text-center text-lg font-semibold">
                INSTRUCTOR
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4"> {/* Ensure flex column layout */}
              <Button onClick={() => navigateTo("/add-instructor")}>Add Instructor</Button>
              <Button onClick={() => navigateTo("/delete-instructor")}>Delete Instructor</Button>
            </CardContent>
          </Card>

          {/* COURSES */}
          <Card className="shadow-lg bg-white p-6">
            <CardHeader>
              <CardTitle className="text-center">
                <FaBook size={40} />
              </CardTitle>
              <CardDescription className="text-center text-lg font-semibold">
                COURSES
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4"> {/* Ensure flex column layout */}
              <Button onClick={() => navigateTo("/all-courses")}>Course Info</Button>
            </CardContent>
          </Card>

          {/* REGISTRATION */}
          <Card className="shadow-lg bg-white p-6">
            <CardHeader>
              <CardTitle className="text-center">
                <FaClipboardList size={40} />
              </CardTitle>
              <CardDescription className="text-center text-lg font-semibold">
                REGISTRATION
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4"> {/* Ensure flex column layout */}
              <Button onClick={() => navigateTo("/course-registration")}>Course Registration</Button>
              <Button onClick={() => navigateTo("/coursepreregistration")}>Course Pre-Registration</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
