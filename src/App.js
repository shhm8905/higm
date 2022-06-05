import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Courses from './pages/Courses';
import Course from './pages/Course';
import Auth from './components/Auth';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/course' element={<Course />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
