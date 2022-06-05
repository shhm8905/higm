import { useDispatch, useSelector } from "react-redux";
import { handleShow } from "../../featurs/courseSlice";
import Course from "../../components/Course";
import Add from "../../components/Add";
import './style.css';

const Courses = () => {
    const dispatch = useDispatch();
    const { courses } = useSelector(state => state.course);



    return (
        <div className='courses' >
            {courses.length > 0 && (
                <header>
                    <h1 className="courses-title">Add New Course</h1>
                    <button className='add-icon' onClick={() => dispatch(handleShow())}>+</button><hr />
                </header>
            )}
            <Add />
            <Course />
        </div>
    )
}

export default Courses;