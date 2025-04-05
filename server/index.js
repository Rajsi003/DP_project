const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//create a course
app.post("/courses", async (req, res) => {
    try {
        const { 
            course_code, 
            course_name, 
            instructor_name, 
            instructor_id, 
            avail, 
            dcfor, 
            defor, 
            icornot, 
            slot, 
            credit, 
            ltpc 
        } = req.body;
        const newCourse = await pool.query(
            `INSERT INTO courses (course_code, course_name, instructor_name, instructor_id, avail, dcfor, defor, icornot, slot, credit, ltpc) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`, 
            [course_code, course_name, instructor_name, instructor_id, avail, dcfor, defor, icornot, slot, credit, ltpc]
        );
        res.status(201).json({
            message: "Course created successfully!",
            course: newCourse.rows[0] // Assuming you're using PostgreSQL and you want to send the inserted row
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

//get all courses
 app.get("/courses", async(req,res) =>{
    try {
        const allCourses = await pool.query("SELECT * FROM courses");
        res.json(allCourses.rows);
    } catch (error) {
        console.error(error.message);
    }
 })

//get a course
app.get("/courses/:id", async(req,res) =>{
    try {
        const{id} = req.params;
        const course = await pool.query("SELECT * FROM courses WHERE course_code = $1",[id])
        res.json(course.rows[0]);


    } catch (error) {
        console.error(error.message);
    }
 })

//update a course
app.put("/courses/:id", async (req, res) => {
    try {
        const { id } = req.params; // The course code to find the course
        const {
            course_name,
            instructor_name,
            instructor_id,
            avail,
            dcfor,
            defor,
            icornot,
            slot,
            credit,
            ltpc
        } = req.body; // All possible fields to update

        // Build the update query dynamically
        let query = "UPDATE courses SET ";
        let values = [];
        let i = 1;

        // Conditionally add fields to update
        if (course_name) {
            query += `course_name = $${i}, `;
            values.push(course_name);
            i++;
        }
        if (instructor_name) {
            query += `instructor_name = $${i}, `;
            values.push(instructor_name);
            i++;
        }
        if (instructor_id) {
            query += `instructor_id = $${i}, `;
            values.push(instructor_id);
            i++;
        }
        if (avail) {
            query += `avail = $${i}, `;
            values.push(avail);
            i++;
        }
        if (dcfor) {
            query += `dcfor = $${i}, `;
            values.push(dcfor);
            i++;
        }
        if (defor) {
            query += `defor = $${i}, `;
            values.push(defor);
            i++;
        }
        if (icornot) {
            query += `icornot = $${i}, `;
            values.push(icornot);
            i++;
        }
        if (slot) {
            query += `slot = $${i}, `;
            values.push(slot);
            i++;
        }
        if (credit) {
            query += `credit = $${i}, `;
            values.push(credit);
            i++;
        }
        if (ltpc) {
            query += `ltpc = $${i}, `;
            values.push(ltpc);
            i++;
        }

        // Remove the last comma and space
        query = query.slice(0, -2);

        // Add the WHERE clause to update by course_code (id)
        query += ` WHERE course_code = $${i}`;
        values.push(id);

        // Execute the query
        await pool.query(query, values);

        res.json("Course was updated");
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

//delete a course

app.delete("/courses/:id", async(req,res) =>{
    try {
        const{id} = req.params;
        const deleteCourse = await pool.query("DELETE FROM courses WHERE course_code = $1",[id]);
        res.json("Todo was deleted!");
    } catch (error) {
        console.error(error.message);
    }
 })

 app.get("/students/:roll_no", async (req, res) => {
    try {
        const { roll_no } = req.params;
        const student = await pool.query("SELECT * FROM students WHERE roll_no = $1", [roll_no]);
        
        if (student.rows.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        
        res.json(student.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

// PRE-REGISTRATION ROUTES
// Get pre-registered courses for a student
// app.get("/coursepreregistration/:roll_no", async (req, res) => {
//     try {
//         const { roll_no } = req.params;
//         console.log("Fetching courses for roll_no:", roll_no); // Debugging log

//         const query = `
//             SELECT pr.id, pr.course_code, pr.slot, pr.status, c.course_name
//             FROM Course_Pre_Registration pr
//             LEFT JOIN courses c ON pr.course_code = c.course_code
//             WHERE pr.roll_no = $1
//         `;

//         const result = await pool.query(query, [roll_no]);

//         if (result.rows.length === 0) {
//             return res.status(404).json({ error: "No courses found for this roll number" });
//         }

//         res.json(result.rows);
//     } catch (error) {
//         console.error("Database error:", error.message);
//         res.status(500).json({ error: "Failed to fetch course pre-registrations", details: error.message });
//     }
// });

app.get("/coursepreregistration/:roll_no", async (req, res) => {
    try {
      const { roll_no } = req.params
      console.log("Fetching courses for roll_no:", roll_no)
  
      // Get the student's branch
      const studentQuery = `SELECT student_branch_code FROM students WHERE roll_no = $1`
      const studentResult = await pool.query(studentQuery, [roll_no])
  
      if (studentResult.rows.length === 0) {
        return res.status(404).json({ error: "Student not found" })
      }
  
      const studentBranch = studentResult.rows[0].student_branch_code
  
      // Now fetch courses along with pre-registration status and course details
      const query = `
        SELECT
          pr.id,
          pr.course_code,
          pr.status,
          c.course_name,
          c.instructor_name,
          c.slot,
          c.credit,
          c.ltpc,
          c.icornot,
          c.dcfor,
          c.defor
        FROM Course_Pre_Registration pr
        LEFT JOIN courses c ON pr.course_code = c.course_code
        WHERE pr.roll_no = $1
      `
  
      const result = await pool.query(query, [roll_no])
  
      const processed = result.rows.map((row) => {
        // Determine course type
        let type = "DE" // default to DE
        if (row.icornot === "IC") {
          type = "IC"
        } else if (row.dcfor.includes(studentBranch)) {
          type = "DC"
        }
  
        return {
          id: row.id,
          course_code: row.course_code,
          course_name: row.course_name,
          instructor_name: row.instructor_name,
          type,
          slot: row.slot,
          credit: row.credit,
          ltpc: row.ltpc,
          status: row.status,
        }
      })
  
      res.json(processed)
    } catch (error) {
      console.error("Database error:", error.message)
      res.status(500).json({
        error: "Failed to fetch course pre-registrations",
        details: error.message,
      })
    }
  })
  

app.post("/register-courses", async (req, res) => {
    try {
        console.log("Received request:", req.body);

        const { roll_no, courses } = req.body;
        if (!roll_no || !courses || !Array.isArray(courses)) {
            return res.status(400).json({ error: "Invalid course data" });
        }

        // Filter out invalid courses
        const validCourses = courses.filter(course => 
            course.course_code && course.course_code !== "None" && course.slot
        );

        if (validCourses.length === 0) {
            return res.status(400).json({ error: "No valid courses selected" });
        }

        console.log("Valid courses:", validCourses);

        // Construct the query dynamically
        const query = `
            INSERT INTO Course_Pre_Registration (roll_no, course_code, slot, status) 
            VALUES ${validCourses.map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3}, 'pending')`).join(", ")}
            RETURNING *;
        `;

        const values = validCourses.flatMap(course => [roll_no, course.course_code, course.slot]);

        const result = await pool.query(query, values);
        console.log("Inserted courses:", result.rows);

        res.status(201).json({ message: "Courses registered successfully", data: result.rows });
    } catch (error) {
        console.error("Database error:", error.message, error.stack);
        res.status(500).json({ error: "Failed to register courses", details: error.message });
    }
    
});

// Delete a pre-registration
app.delete("/coursepreregistration/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRegistration = await pool.query(
            "DELETE FROM coursepreregistration WHERE id = $1 RETURNING *",
            [id]
        );
        
        if (deleteRegistration.rowCount === 0) {
            return res.status(404).json({ message: "Registration not found" });
        }
        
        res.json({
            message: "Registration deleted successfully",
            registration: deleteRegistration.rows[0]
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

// Get available courses for a student's branch
// app.get("/available-courses/:branch_code", async (req, res) => {
//     try {
//         const { branch_code } = req.params;
//         const availableCourses = await pool.query(
//             `SELECT * FROM courses 
//              WHERE avail = 'yes'
//              AND (dcfor @> ARRAY[$1] OR dcfor @> ARRAY['All']
//                 OR defor @> ARRAY[$1] OR defor @> ARRAY['All'])`,
//             [branch_code]
//         );
//         res.setHeader("Content-Type", "application/json"); 
//         res.json(availableCourses.rows);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500)
//         .setHeader("Content-Type", "application/json") // ✅ Set JSON content type
//         .json({ error: "Internal Server Error", details: error.message });

//     }
// });
app.use((err, req, res, next) => {
    console.error("Unexpected Error:", err);
    res.status(500).setHeader("Content-Type", "application/json").json({ error: "Something went wrong" });
});

app.get("/available-courses/:branch_code", async (req, res) => {
    res.setHeader("Content-Type", "application/json"); // ✅ Ensure JSON response

    try {
        const { branch_code } = req.params;
        const availableCourses = await pool.query(
            `SELECT * FROM courses 
             WHERE avail = 'yes'
             AND (dcfor @> ARRAY[$1] OR dcfor @> ARRAY['All']
                OR defor @> ARRAY[$1] OR defor @> ARRAY['All'])`,
            [branch_code]
        );

        console.log("API Response:", JSON.stringify(availableCourses.rows, null, 2)); // Debugging

        res.json(availableCourses.rows);
    } catch (error) {
        console.error("Database Query Error:", error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});
//Get Courses Taught by an Instructor (with student preregistration info)
app.get("/instructor/:id/courses", async (req, res) => {
    try {
        const { id } = req.params;

        // Join instructors with courses to get course details
        const coursesQuery = `
            SELECT i.course_code, c.course_name 
            FROM instructors i
            JOIN courses c ON i.course_code = c.course_code
            WHERE i.instructor_id = $1
            LIMIT 6
        `;
        const coursesResult = await pool.query(coursesQuery, [id]);

        const courses = await Promise.all(
            coursesResult.rows.map(async (course) => {
                // Get students for each course
                const studentsQuery = `
                    SELECT 
                        pr.id,
                        pr.roll_no,
                        s.student_name,
                        s.student_branch_code AS branch,
                        pr.status
                    FROM course_pre_registration pr
                    JOIN students s ON pr.roll_no = s.roll_no
                    WHERE pr.course_code = $1
                `;
                const studentsResult = await pool.query(studentsQuery, [course.course_code]);

                return {
                    course_code: course.course_code,
                    course_name: course.course_name,
                    students: studentsResult.rows,
                };
            })
        );

        res.json(courses);
    } catch (error) {
        console.error("Instructor Courses Error:", error.message);
        res.status(500).json({ error: "Failed to fetch instructor courses", details: error.message });
    }
});

// 2. Update Student Status (Accept/Reject) for a Pre-Registered Course
app.put("/coursepreregistration/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const updateQuery = `
            UPDATE course_pre_registration 
            SET status = $1 
            WHERE id = $2 
            RETURNING *
        `;
        const result = await pool.query(updateQuery, [status, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Registration not found" });
        }

        res.json({
            message: "Status updated successfully",
            updated: result.rows[0],
        });
    } catch (error) {
        console.error("Update Status Error:", error.message);
        res.status(500).json({ error: "Failed to update status", details: error.message });
    }
});

app.listen(5001, () => {
    console.log("server has started on port 5001");
});  