import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourse, getCourses, handleEdit, handleShow, reset } from '../../featurs/courseSlice';
import parse from 'html-react-parser';
import Spinner from '../Spinner';
import './style.css';

const Course = () => {
    const dispatch = useDispatch();
    const { courses, isLoading, } = useSelector(state => state.course);

    useEffect(() => {
        dispatch(getCourses())
        return () => dispatch(reset());
    }, [dispatch]);

    if (isLoading) {
        return <Spinner />
    }
    return (

        <div className={courses.length > 0 ? 'course-content' : null}>

            {
                courses.length > 0 ? courses.map((item, index) => {
                    return (
                        <div className='course-item' key={index} >
                            <figure>
                                <img src={item.img} alt="img" />
                            </figure>
                            <p className='course-teacher'>Teacher: <span>{item.teacher}</span> </p><hr />
                            <h2 className='course-name' >{item.name}</h2>
                            <div className='course-desc'>{parse(item.description)}</div>
                            <button className='edit-btn' onClick={() => dispatch(handleEdit(item))} title='Edit Course' >...</button>
                            <button className='delete-btn' onClick={() => dispatch(deleteCourse(item._id))}>Delete</button>
                        </div>
                    )
                }) : (
                    <div className='no-course' >
                        <h2 className='no-course-title'>You don't have a course , Add new course Please!!!</h2>
                        <button className='add-btn' onClick={() => dispatch(handleShow())}>Add New Course</button>
                    </div>
                )
            }
        </div>
    )
}

export default Course