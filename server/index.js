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
app.get("/coursepreregistration/:roll_no", async (req, res) => {
    try {
        const { roll_no } = req.params;
        const registrations = await pool.query(
            `SELECT pr.id, pr.course_code, pr.course_number, c.course_name
             FROM coursepreregistration pr
             JOIN courses c ON pr.course_code = c.course_code
             WHERE pr.roll_no = $1`,
            [roll_no]
        );
        
        res.json(registrations.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

// Save pre-registered courses
// app.post("/coursepreregistration", async (req, res) => {
//     try {
//         const { roll_no, course_code, course_number } = req.body;
        
//         const newRegistration = await pool.query(
//             `INSERT INTO coursepreregistration (roll_no, course_code, course_number) 
//              VALUES ($1, $2, $3) 
//              RETURNING *`,
//             [roll_no, course_code, course_number]
//         );
        
//         res.status(201).json({
//             message: "Course registration saved successfully",
//             registration: newRegistration.rows[0]
//         });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: error.message });
//     }
// });
app.post("/register-courses", async (req, res) => {
    try {
      console.log("Received request:", req.body);
  
      const { courses } = req.body;
      if (!courses || !Array.isArray(courses) || courses.length === 0) {
        return res.status(400).json({ error: "Invalid course data" });
      }
  
      const values = courses.map(({ roll_no, course_code }, index) => 
        `('${roll_no}', '${course_code}', ${index + 1})` // course_number assigned as index+1
      ).join(",");
  
      const query = `INSERT INTO coursepreregistration (roll_no, course_code, course_number) VALUES ${values}`;
      
      await db.query(query);
      res.status(200).json({ message: "Courses registered successfully" });
  
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to register courses" });
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



app.listen(5001, () => {
    console.log("server has started on port 5001");
});  