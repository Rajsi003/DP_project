import { Badge } from "@/components/ui/badge";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const slotOptions = ["A", "B", "C", "D", "E", "F", "G", "H", "FS"];
const deforOptions = [
  "CS1", "CS2", "CS3", "CS4",
  "BE1", "BE2", "BE3", "BE4",
  "EE1", "EE2", "EE3", "EE4",
  "CE1", "CE2", "CE3", "CE4",
  "ME1", "ME2", "ME3", "ME4",
  "VLSI1", "VLSI2", "VLSI3", "VLSI4",
  "GE1", "GE2", "GE3", "GE4",
  "MS1", "MS2", "MS3", "MS4"
];

const AddCourse = () => {
  const navigate = useNavigate();

  // Form states
  const [course_code, setCourseCode] = useState("");
  const [course_name, setCourseName] = useState("");
  const [instructor_name, setInstructorName] = useState("");
  const [instructor_id, setInstructorId] = useState("");
  const [avail, setAvail] = useState("");
  const [icornot, setIcorNot] = useState("");
  const [slot, setSlot] = useState("");
  const [credit, setCredit] = useState("");
  const [ltpc, setLtpc] = useState("");
  const [dcforSelected, setDcforSelected] = useState<string[]>([]);
  const [deforSelected, setDeforSelected] = useState<string[]>([]);

  // Toggle selection for checkboxes
  const toggleSelection = (
    value: string,
    selectedList: string[],
    setSelectedList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelectedList((prevList) =>
      prevList.includes(value)
        ? prevList.filter((item) => item !== value) // Remove if already selected
        : [...prevList, value] // Add if not selected
    );
  };
  

  // Handle form submission
  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = {
        course_code,
        course_name,
        instructor_name,
        instructor_id,
        avail,
        icornot,
        slot,
        credit,
        ltpc,
        dcfor: dcforSelected,
        defor: deforSelected,
      };

      const response = await fetch("http://localhost:5001/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log("Course added successfully");
        navigate("/all-courses");
      } else {
        console.error("Error adding course");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-5 mb-5 ml-5 mr-5">
      <Card className="w-[750px]">
        <CardHeader>
          <CardTitle className="text-4xl">Add New Course</CardTitle>
          <CardDescription className="text-red-500">
            *Course code must be unique
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmitForm}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Course Code</Label>
                <Input
                  placeholder="Enter unique course code"
                  required
                  value={course_code}
                  onChange={(e) => setCourseCode(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label>Course Name</Label>
                <Input
                  placeholder="Enter course name"
                  required
                  value={course_name}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label>Instructor Name</Label>
                <Input
                  placeholder="Enter instructor name"
                  value={instructor_name}
                  onChange={(e) => setInstructorName(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label>Instructor ID</Label>
                <Input
                  placeholder="Enter instructor ID"
                  value={instructor_id}
                  onChange={(e) => setInstructorId(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label>Available</Label>
                <Select value={avail} onValueChange={setAvail}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* DC For Multi-Select */}
              <div className="flex flex-col space-y-1.5">
                <Label>DC For</Label>
                {/* Display selected options as badges */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {dcforSelected.length > 0 ? (
                    dcforSelected.map((option) => (
                      <Badge key={option} variant="outline">
                        {option}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No selection</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 border rounded-md p-2 max-h-32 overflow-y-auto">
                  {deforOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        checked={dcforSelected.includes(option)}
                        onCheckedChange={() =>
                          toggleSelection(option, dcforSelected, setDcforSelected)
                        }
                      />
                      <Label className="text-sm">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* DE For Multi-Select */}
              <div className="flex flex-col space-y-1.5">
                <Label>DE For</Label>
                {/* Display selected options as badges */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {deforSelected.length > 0 ? (
                    deforSelected.map((option) => (
                      <Badge key={option} variant="outline">
                        {option}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No selection</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 border rounded-md p-2 max-h-32 overflow-y-auto">
                  {deforOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        checked={deforSelected.includes(option)}
                        onCheckedChange={() =>
                          toggleSelection(option, deforSelected, setDeforSelected)
                        }
                      />
                      <Label className="text-sm">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>


              <div className="flex flex-col space-y-1.5">
                <Label>IC or Not</Label>
                <Select value={icornot} onValueChange={setIcorNot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IC">IC</SelectItem>
                    <SelectItem value="Non-IC">Non-IC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label>Slot</Label>
                <Select value={slot} onValueChange={setSlot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {slotOptions.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label>LTPC</Label>
                <Input
                  placeholder="Enter LTPC eg.(3-0-1-4)"
                  value={ltpc}
                  onChange={(e) => setLtpc(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label>Credit</Label>
                <Input
                  type="number"
                  placeholder="Enter credit value"
                  value={credit}
                  onChange={(e) => setCredit(e.target.value)}
                />
              </div>
            </div>
            <CardFooter className="flex justify-between mt-4">
              <Button variant="outline" onClick={() => navigate("/all-courses")}>
                Go Back
              </Button>
              <Button type="submit">Add Course</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCourse;

