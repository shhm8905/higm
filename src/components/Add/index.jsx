import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, updateCourse, handleClose } from '../../featurs/courseSlice';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Spinner from '../Spinner';
import './style.css';

const Add = () => {
    const dispatch = useDispatch();
    const { isShow, isUpdate, course, isLoading } = useSelector(state => state.course);
    const [data, setData] = useState({ name: '', teacher: '', description: '', img: '' });

    useEffect(() => {
        if (isUpdate) {
            setData((prevState) => ({ ...prevState, name: course.name, teacher: course.teacher, img: course.img, _id: course._id }));
            setTimeout(() => {
                setData((prevState) => ({ ...prevState, description: course.description }));
            }, 50)
        }
        if (!isShow) {
            setData((prevState) => ({ ...prevState, name: '', teacher: '', img: '' }));
            setTimeout(() => {
                setData((prevState) => ({ ...prevState, description: '' }));
            }, 50)
        }
    }, [isUpdate, course, isShow])

    const handleChange = e => {
        if (e.target.name === 'img') {
            if (e.target.files[0]) {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => setData({ ...data, img: reader.result });
                reader.onerror = (err) => console.log(err);
            }
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (isUpdate) {
            dispatch(updateCourse(data));
            dispatch(handleClose());
            setData({ name: '', teacher: '', description: '', img: '' });
        } else {
            dispatch(createCourse(data));
            dispatch(handleClose());
            setData({ name: '', teacher: '', description: '', img: '' })
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className={isShow ? "Add" : 'd-n'}>
            <form className="form" onSubmit={handleSubmit}>
                <button type='button' className="close-icon" onClick={() => dispatch(handleClose())}>X</button>
                <h1 className='form-title' >Add new course</h1>

                <label className="form-label" htmlFor="name">Name</label>
                <input className='form-inp' id="name" name="name" type="text" value={data.name} onChange={handleChange} placeholder='Add new Course' required />

                <label className="form-label" htmlFor="teacher">Teacher</label>
                <input className='form-inp' id="teacher" name="teacher" type="text" value={data.teacher} onChange={handleChange} placeholder='Add teacher name' required />

                <label className="form-label" htmlFor="description">Description</label>
                <div className="Add-editor">
                    <CKEditor editor={ClassicEditor} data={data.description} onChange={(e, editor) => { setData({ ...data, description: editor.getData() }) }} />
                </div>

                <label className="form-label" htmlFor="img">Add your image</label>
                <input className="form-inp" type="file" id="img" name="img" onChange={handleChange} accept="image/*" required />

                <button className='add-btn' type="submit">{isUpdate ? 'Update' : 'Add'}</button>
            </form>
        </div>
    )
}

export default Add