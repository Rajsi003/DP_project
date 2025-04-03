import './global.css';
import { Routes, Route } from 'react-router-dom';
import  CourseSelectionForm  from './_root/pages/CourseSelectionForm';
import  Home  from './_root/pages/Home';
import  Thanku  from './_root/pages/Thanku';
import  Thankuu  from './_root/pages/thankuu';
import  AllCourses  from './_root/pages/AllCourses';
import  AddCourse  from './_root/pages/AddCourse';
import  CourseList  from './_root/pages/CourseList';
import  Student  from './_root/pages/Student';
import  Admin from './_root/pages/Admin';
import RootLayout from './_root/RootLayout';
import Login from './_auth/Login';
import { EditCourse } from './_root/pages';

const App = () => {
  return (
    <main >
        <Routes>
            {/* public */}
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
          
            {/* private */}
                
                                
                <Route path="/all-courses" element={<AllCourses/>}/>
                <Route path="/add-course" element={<AddCourse/>}/>
                <Route path="/edit-course/:id" element={<EditCourse/>}/>
                <Route path="/course-selection" element={<CourseSelectionForm/>}/>
                <Route path="/thanku" element={<Thanku/>}/>
                <Route path="/thankuu" element={<Thankuu/>}/>
                <Route path="/course-list" element={<CourseList/>}/>
                <Route path="/student" element={<Student/>}/>
                <Route path="/admin" element={<Admin/>}/>

          
          
        </Routes>

    </main>
  
  )
}

export default App