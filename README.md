# 📘 ERP Module – Course Registration Platform

This project began as part of our **IC-202P** course, where we were tasked with developing a comprehensive web platform for our college students with features to manage **course pre-registration**, **final registration**, **view results**, **access course information**, and **stay updated with academic events via a calendar**.

Having experienced firsthand the challenges students face with our current systems—shifting from **OAS** to **Samarth**, and at times even relying on **Google Forms**—we recognized the need for a more stable, streamlined, and college-specific solution.

Under the guidance of the **AD (Courses)**, we implemented features tailored to our institute's specific needs. Our team collaborated closely, dividing responsibilities effectively. **My primary focus was on developing the course pre-registration and final registration modules.**

We submitted our initial prototype, which has since been handed over to a dedicated team for further refinement. The enhanced version is planned to be tested for use in the upcoming semester. **This repository is just my contribution to the project.**

---

## ✨ Features

- 📝 Course Pre-Registration and Registration
- 📊 View Course Summaries and Gradecards
- 📅 Event Calendar
- 👨‍🏫 Instructor Interface for Managing Registrations
- 🛠️ Admin Dashboard to Manage Students, Instructors, and Courses

---

## 🚀 Tech Stack

### Frontend:
- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS 4**
- **Shadcn/UI**
- **React Router DOM**

### Backend:
- **Node.js**
- **Express.js**
- **PostgreSQL**

---

## 📁 Project Structure

```
samarth2.0/
├── public/
│   ├── sample_input.txt
│   ├── sample_output.txt
│   └── vite.svg
├── server/
│   ├── database.sql
│   ├── db.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── src/
│   ├── _auth/
│   │   └── Login.tsx
│   ├── _root/
│   ├── pages/
│   │   ├── AddCourse.tsx
│   │   ├── Admin.tsx
│   │   ├── AllCourses.tsx
│   │   ├── CourseList.tsx
│   │   ├── CourseRegistration.tsx
│   │   ├── CourseSelection.tsx
│   │   ├── EditCourse.tsx
│   │   ├── Home.tsx
│   │   ├── index.ts
│   │   ├── InstructorPage.tsx
│   │   ├── RegisteredCoursePage.tsx
│   │   ├── RegisteredCourses.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Student.tsx
│   │   ├── ThankYou.tsx
│   │   └── RootLayout.tsx
│   ├── assets/
│   ├── components/
│   │   ├── shared/
│   │   │   ├── app-sidebar.tsx
│   │   │   └── Sidebar.tsx
│   │   └── ui/
│   │       ├── alert-dialog.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── popover.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── tooltip.tsx
│   │       └── use-mobile.ts
│   ├── hooks/
│   │   └── use-mobile.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── global.css
│   └── main.tsx
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```



---

## ▶️ Try It Out

### 🖥️ Start Backend

```bash
cd server
nodemon index
npm install
npm run dev
```


---



## 📸 Screenshots

### 🏠 Homepage
![Homepage](Ss_DP/Screenshot 2025-06-21 at 11.27.30 AM.png)

### 🙋‍♂️ Student Login
![Student Login](Ss_DP/Screenshot 2025-06-21 at 11.37.03 AM.png)

### 📚 Student Dashboard
![Student Dashboard](Ss_DP/Screenshot 2025-06-21 at 11.29.04 AM.png)

### 📝 Course Pre-Registration
![Course Pre-Registration 1](Ss_DP/Screenshot 2025-06-21 at 11.30.14 AM.png)  
![Course Pre-Registration 2](Ss_DP/Screenshot 2025-06-21 at 11.32.16 AM.png)  
![Course Pre-Registration 3](Ss_DP/Screenshot 2025-06-21 at 11.35.06 AM.png)

### 📄 Course Summary
![Course Summary 1](Ss_DP/Screenshot 2025-06-21 at 11.47.30 AM.png)  
![Course Summary 2](Ss_DP/Screenshot 2025-06-21 at 11.30.52 AM.png)

### 🧾 Course Registration
![Course Registration 1](Ss_DP/Screenshot 2025-06-21 at 1.05.33 PM.png)  
![Course Registration 2](Ss_DP/Screenshot 2025-06-21 at 11.30.29 AM.png)

### 👩‍💼 Admin Login
![Admin Login](Ss_DP/Screenshot 2025-06-21 at 11.38.18 AM.png)

### 🛠️ Admin Dashboard
![Admin Dashboard](Ss_DP/Screenshot 2025-06-21 at 11.38.23 AM.png)

### 📋 Course Details
![Course Details 1](Ss_DP/Screenshot 2025-06-21 at 11.38.42 AM.png)  
![Course Details 2](Ss_DP/Screenshot 2025-06-21 at 11.39.12 AM.png)

### ✏️ Edit Course Details
![Edit Course](Ss_DP/Screenshot 2025-06-21 at 11.38.49 AM.png)

### ➕ Add New Course
![Add Course](Ss_DP/Screenshot 2025-06-21 at 11.39.03 AM.png)

### 👨‍🏫 Instructor Login
![Instructor Login](Ss_DP/Screenshot 2025-06-21 at 11.40.32 AM.png)

### 📊 Instructor Dashboard
![Instructor Dashboard](Ss_DP/Screenshot 2025-06-21 at 11.41.28 AM.png)






