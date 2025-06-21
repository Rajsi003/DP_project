const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//ALL-COURSE ROUTES
// Get all courses with registered students
app.get("/courses-with-students", async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT 
          c.course_code,
          c.course_name,
          s.roll_no,
          s.student_name,
          s.student_branch_code,
          cr.slot
        FROM course_registration cr
        JOIN students s ON cr.roll_no = s.roll_no
        JOIN courses c ON cr.course_code = c.course_code
        ORDER BY c.course_code, s.roll_no
      `);
  
      // Group students under their respective courses
      const grouped = {};
      for (const row of result.rows) {
        const course = row.course_code;
        if (!grouped[course]) {
          grouped[course] = {
            course_name: row.course_name,
            course_code: course,
            students: [],
          };
        }
        grouped[course].students.push({
          roll_no: row.roll_no,
          name: row.student_name,
          branch: row.student_branch_code,
          slot: row.slot,
        });
      }
  
      res.json(Object.values(grouped));
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error" });
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

//add a course
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

        // Always insert course into the courses table
        const newCourse = await pool.query(
            `INSERT INTO courses (course_code, course_name, instructor_name, instructor_id, avail, dcfor, defor, icornot, slot, credit, ltpc) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`, 
            [course_code, course_name, instructor_name, instructor_id, avail, dcfor, defor, icornot, slot, credit, ltpc]
        );

        // Check if the pair of instructor_id and course_code already exists in the instructors table
        const instructorCheck = await pool.query(
            "SELECT * FROM instructors WHERE instructor_id = $1 AND course_code = $2", 
            [instructor_id, course_code]
        );

        // If the instructor-course pair does not exist, insert them into the instructors table
        if (instructorCheck.rows.length === 0) {
            await pool.query(
                `INSERT INTO instructors (instructor_id, instructor_name, course_code) 
                VALUES ($1, $2, $3)`, 
                [instructor_id, instructor_name, course_code]
            );
        }

        res.status(201).json({
            message: "Course created and instructor added (if necessary) successfully!",
            course: newCourse.rows[0] // Send the inserted course details in the response
        });
    } catch (error) {
        console.error("Error occurred while adding the course/instructor:", error.message);
        res.status(500).json({ error:error.message });
    }
});


 //get student of some roll_no
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
        pr.course_code,
        MIN(pr.id) as id, 
        MAX(pr.status) as status,
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
      GROUP BY pr.course_code, c.course_name, c.instructor_name, c.slot, c.credit, c.ltpc, c.icornot, c.dcfor, c.defor;
    `;
    
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
  
// add pre-registred courses to pre-registered table
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
app.post("/add-course", async (req, res) => {
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

        // Check if instructor_id and course_code exist in the instructors table
        const instructorCheck = await pool.query(
            "SELECT * FROM instructors WHERE instructor_id = $1 AND course_code = $2", 
            [instructor_id, course_code]
        );

        // If the instructor and course combination doesn't exist, insert it into instructors table
        if (instructorCheck.rows.length === 0) {
            await pool.query(
                `INSERT INTO instructors (instructor_id, instructor_name, course_code)
                 VALUES ($1, $2, $3)`, 
                [instructor_id, instructor_name, course_code]
            );
        }

        // Insert the course details into the courses table
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
        console.error("Error occurred while adding the course/instructor:", error.message);
        res.status(500).json({ error:error.message });
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
//create a course

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
                // Get unique students for each course
                const studentsQuery = `
                    SELECT DISTINCT ON (pr.roll_no)
                        pr.id,
                        pr.roll_no,
                        s.student_name,
                        s.student_branch_code AS branch,
                        pr.status
                    FROM course_pre_registration pr
                    JOIN students s ON pr.roll_no = s.roll_no
                    WHERE pr.course_code = $1
                    ORDER BY pr.roll_no, pr.id
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

// PUT /coursepreregistration/priority/:roll_no
app.post("/coursepreregistration/priority/:roll_no", async (req, res) => {
    const { roll_no } = req.params;
    const priorities = req.body.priorities; // format: [{ course_code, slot, priority }, ...]
  
    if (!Array.isArray(priorities)) {
      return res.status(400).json({ message: "Invalid data format" });
    }
  
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
  
      for (const { course_code, slot, priority } of priorities) {
        await client.query(
          `UPDATE course_pre_registration
           SET priority = $1
           WHERE roll_no = $2 AND course_code = $3 AND slot = $4 AND status = 'accepted'`,
          [priority, roll_no, course_code, slot]
        );
      }
  
      await client.query("COMMIT");
      res.json({ message: "Priorities updated successfully" });
    } catch (err) {
      await client.query("ROLLBACK");
      console.error(err);
      res.status(500).json({ err});
    } finally {
      client.release();
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

// Register a student for a course
app.post("/coursepreregistration", async (req, res) => {
    try {
        const { roll_no, course_code } = req.body;

        // Check if the student is already registered for this course
        const checkRegistration = await pool.query(
            "SELECT * FROM course_pre_registration WHERE roll_no = $1 AND course_code = $2", 
            [roll_no, course_code]
        );

        if (checkRegistration.rows.length > 0) {
            return res.status(400).json({ message: "Student already registered for this course." });
        }

        // Insert the registration into course_pre_registration
        const newRegistration = await pool.query(
            `INSERT INTO course_pre_registration (roll_no, course_code, status) 
            VALUES ($1, $2, 'pending') RETURNING *`,
            [roll_no, course_code]
        );

        res.status(201).json({
            message: "Student successfully registered for the course",
            registration: newRegistration.rows[0]
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to register student for the course", details: error.message });
    }
});

//get accepted courses from pre-registration to be displayed to registration form
// Example in Express (Node.js)
app.get('/accepted-courses/:roll_no', async (req, res) => {
    const { roll_no } = req.params;
  
    try {
      const result = await pool.query(`
SELECT DISTINCT ON (c.course_code)
       c.course_code, c.course_name, c.instructor_name, c.instructor_id,
       c.slot, c.credit, c.ltpc, c.avail, c.dcfor, c.defor, c.icornot
FROM course_pre_registration pr
JOIN courses c ON pr.course_code = c.course_code
WHERE pr.roll_no = $1 AND pr.status = 'accepted';

      `, [roll_no]);
  
      res.json(result.rows); // [{ course_code: 'CS101' }, ...]
    } catch (error) {
      console.error("Error fetching accepted course codes:", error);
      res.status(500).json({ error: "Failed to fetch accepted course codes", details: error.message });
    }
  });
  
  
//add pre-registered accepted courses selection to registration form 
app.post("/register-courses-final", async (req, res) => {
    try {
      console.log("Received final registration:", req.body);
  
      const { roll_no, courses } = req.body;
  
      if (!roll_no || !courses || !Array.isArray(courses)) {
        return res.status(400).json({ error: "Invalid registration data" });
      }
  
      const validCourses = courses.filter(course =>
        course.course_code && course.slot
      );
  
      if (validCourses.length === 0) {
        return res.status(400).json({ error: "No valid courses to register" });
      }
  
      console.log("Valid final registrations:", validCourses);
  
      const query = `
        INSERT INTO course_registration (roll_no, course_code, slot)
        VALUES ${validCourses.map((_, i) =>
          `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`
        ).join(", ")}
        RETURNING *;
      `;
  
      const values = validCourses.flatMap(course => [
        roll_no,
        course.course_code,
        course.slot
      ]);
  
      const result = await pool.query(query, values);
      console.log("Inserted final registrations:", result.rows);
  
      res.status(201).json({ message: "Courses registered successfully", data: result.rows });
  
    } catch (error) {
      console.error("Database error:", error.message, error.stack);
      res.status(500).json({ error: "Failed to register final courses", details: error.message });
    }
  });

  //get courses registered by roll no x
  app.get('/registered-courses/:roll_no', async (req, res) => {
    const { roll_no } = req.params;
  
    try {
      const result = await pool.query(`
        SELECT 
          cr.roll_no,
          cr.course_code,
          cr.slot,
          c.course_name,
          c.instructor_name,
          c.instructor_id,
          c.avail,
          c.dcfor,
          c.defor,
          c.icornot,
          c.credit,
          c.ltpc
        FROM course_registration cr
        JOIN courses c ON cr.course_code = c.course_code
        WHERE cr.roll_no = $1;
      `, [roll_no]);
  
      res.json(result.rows); // Return all registered course details
    } catch (error) {
      console.error("Error fetching registered course details:", error);
      res.status(500).json({ error: "Failed to fetch registered course details", details: error.message });
    }
  });
  
  
app.listen(5001, () => {
    console.log("server has started on port 5001");
});  