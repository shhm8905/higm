import axios from 'axios';

const API = axios.create({ baseURL: 'https://higm-project.herokuapp.com/courses' });

const getCourses = async () => {
    const res = await API.get('/').catch(err => console.log(err));
    return res.data;
};

const createCourse = async (data) => {
    const res = await API.post('/', data).catch(err => console.log(err));
    return res.data;
};

const updateCourse = async (id, data) => {
    const res = await API.patch(`/${id}`, data).catch(err => console.log(err));
    return res.data;
};

const deleteCourse = async (id) => {
    const res = await API.delete(`/${id}`).catch(err => console.log(err));
    return res.data;
};

const Courses = { getCourses, createCourse, updateCourse, deleteCourse };
export default Courses;