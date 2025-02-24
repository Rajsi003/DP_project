import './global.css';
import { Routes, Route } from 'react-router-dom';
import  CourseSelectionForm  from './_root/pages/CourseSelectionForm';
import  Home  from './_root/pages/Home';
import  Thanku  from './_root/pages/Thanku';
import  CourseList  from './_root/pages/CourseList';
import  Student  from './_root/pages/Student';
import RootLayout from './_root/RootLayout';
import Login from './_auth/Login';

const App = () => {
  return (
    <main >
        <Routes>
            {/* public */}
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
          
            {/* private */}

                <Route path="/course-selection" element={<CourseSelectionForm/>}/>
                <Route path="/thanku" element={<Thanku/>}/>
                <Route path="/course-list" element={<CourseList/>}/>
                <Route path="/student" element={<Student/>}/>

          
          
        </Routes>

    </main>
  
  )
}

export default App