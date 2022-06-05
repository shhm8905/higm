import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Courses from "../api/courses";

const initialState = {
    course: {},
    courses: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: '',
    isShow: false,
    isUpdate: false
}

export const getCourses = createAsyncThunk('courses/getAll', async (_, thunkAPI) => {
    try {
        return await Courses.getCourses();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const createCourse = createAsyncThunk('courses/create', async (data, thunkAPI) => {
    try {
        return await Courses.createCourse(data);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const updateCourse = createAsyncThunk('courses/update', async (data, thunkAPI) => {
    try {
        const id = data._id;
        return await Courses.updateCourse(id, data);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteCourse = createAsyncThunk('courses/delete', async (id, thunkAPI) => {
    try {
        return await Courses.deleteCourse(id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const coursSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = ''
        },
        handleShow: (state) => {
            state.isShow = true;
        },
        handleClose: (state) => {
            state.isShow = false;
            if (state.isUpdate === true) {
                state.isUpdate = false;
            }
        },
        handleEdit: (state, action) => {
            state.isUpdate = true;
            state.isShow = true;
            state.course = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCourses.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.courses = action.payload;
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createCourse.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.courses.push(action.payload);
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateCourse.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.courses = state.courses.map(course => course._id === action.payload._id ? action.payload : course);
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteCourse.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.courses = state.courses.filter(course => course._id !== action.payload);
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { handleEdit, handleShow, reset, handleClose } = coursSlice.actions;

export default coursSlice.reducer;

