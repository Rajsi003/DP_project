import React, { useEffect, useState } from 'react';

const RegisteredStudents = () => {
  const [courses, setCourses] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/courses-with-students')
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error('Error fetching courses:', err));
  }, []);

  const toggleCourse = (courseCode) => {
    setExpandedCourse((prev) => (prev === courseCode ? null : courseCode));
  };

  const getUniqueStudents = (students) => {
    const unique = {};
    return students.filter((s) => {
      const key = `${s.roll_no}-${s.slot}`;
      if (!unique[key]) {
        unique[key] = true;
        return true;
      }
      return false;
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Registered Courses</h2>
      {courses.map((course) => (
        <div key={course.course_code} className="mb-4 border rounded p-3">
          <div
            className="cursor-pointer text-black-600 font-medium"
            onClick={() => toggleCourse(course.course_code)}
          >
            {course.course_code} - {course.course_name}
          </div>

          {expandedCourse === course.course_code && (
            <div className="mt-2">
              <h3 className="font-semibold text-gray-700 mb-2">Students:</h3>
              <ul className="list-disc list-inside">
                {getUniqueStudents(course.students).map((student, index) => (
                  <li key={index}>
                    {student.name} ({student.roll_no}) - {student.branch} | Slot {student.slot}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RegisteredStudents;
