import { Badge } from "@/components/ui/badge";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
const deforOptions = ["CS1", "CS2", "CS3", "CS4", "BE1", "BE2", "BE3", "BE4"];

const EditCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the course ID from URL
  const [courseData, setCourseData] = useState<any>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5001/courses/${id}`);
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    fetchCourse();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5001/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        console.log("Course updated successfully");
        navigate("/all-courses");
      } else {
        console.error("Error updating course");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!courseData) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[750px]">
        <CardHeader>
          <CardTitle className="text-4xl">Edit Course</CardTitle>
          <CardDescription className="text-red-500">
            Modify the course details and save changes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Course Code</Label>
                <Input
                  name="course_code"
                  value={courseData.course_code}
                  onChange={handleInputChange}
                  disabled
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label>Course Name</Label>
                <Input
                  name="course_name"
                  value={courseData.course_name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label>Instructor Name</Label>
                <Input
                  name="instructor_name"
                  value={courseData.instructor_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Instructor ID</Label>
                <Input
                  name="instructor_id"
                  value={courseData.instructor_id}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label>Available</Label>
                <Select
                  value={courseData.avail}
                  onValueChange={(val) => setCourseData({ ...courseData, avail: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex flex-col space-y-1.5">
                <Label>DE For</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {courseData.defor.map((option: string) => (
                    <Badge key={option} variant="outline">
                      {option}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 border rounded-md p-2 max-h-32 overflow-y-auto">
                  {deforOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        checked={courseData.dcfor.includes(option)}
                        onCheckedChange={() => {
                          const newDcfor = courseData.dcfor.includes(option)
                            ? courseData.dcfor.filter((item: string) => item !== option)
                            : [...courseData.dcfor, option];
                          setCourseData({ ...courseData, defor: newDcfor });
                        }}
                      />
                      <Label className="text-sm">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>DE For</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {courseData.defor.map((option: string) => (
                    <Badge key={option} variant="outline">
                      {option}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 border rounded-md p-2 max-h-32 overflow-y-auto">
                  {deforOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        checked={courseData.defor.includes(option)}
                        onCheckedChange={() => {
                          const newDefor = courseData.defor.includes(option)
                            ? courseData.defor.filter((item: string) => item !== option)
                            : [...courseData.defor, option];
                          setCourseData({ ...courseData, defor: newDefor });
                        }}
                      />
                      <Label className="text-sm">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label>IC or Not</Label>
                <Select
                  value={courseData.icornot}
                  onValueChange={(val) => setCourseData({ ...courseData, icornot: val })}
                >
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
                <Select
                  value={courseData.slot}
                  onValueChange={(val) => setCourseData({ ...courseData, slot: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {slotOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>



              <div className="flex flex-col space-y-1.5">
                <Label>LTPC</Label>
                <Input
                  name="ltpc"
                  value={courseData.ltpc}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Credits</Label>
                <Input
                  name="credit"
                  value={courseData.credit}
                  onChange={handleInputChange}
                />
              </div>

            </div>

            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => navigate("/all-courses")}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

 export default EditCourse;