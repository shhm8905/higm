import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../featurs/courseSlice";
import { handleSearch } from "../../featurs/videoSlice";
import parse from "html-react-parser";
import "./style.css";

const Courses = () => {
  const dispatch = useDispatch(),
    router = useNavigate();
  const { courses } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.user);

  if (!Array.isArray(courses) || courses.length < 0) {
    alert("There is no courses to show !!!");
  }

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleStart = (course) => {
    if (user) {
      dispatch(handleSearch(course));
      router("/course");
    } else {
      router("/auth");
    }
  };

  return (
    <div className="home-courses">
      <header>
        <h1 className="course-title">Our Courses</h1>
      </header>
      <div className={courses.length > 0 ? "course-content" : "d-n"}>
        {courses.map((course, index) => {
          return (
            <div className="course-item" key={index}>
              <figure>
                <img src={course.img} alt="img" />
              </figure>
              <p className="course-teacher">
                Teacher: <span>{course.teacher}</span>{" "}
              </p>
              <hr />
              <h2 className="course-name"> {course.name} </h2>
              <div className="course-desc"> {parse(course.description)} </div>
              <button
                className="start-btn"
                onClick={() => handleStart(course.name)}
              >
                Start Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
