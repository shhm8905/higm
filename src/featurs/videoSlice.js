import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from '../api/yotube';

const initialState = {
    videos: [],
    video: null,
    search: 'Learn mern',
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const getVideos = createAsyncThunk('/getvideos', async (search, thunkAPI) => {
    try {
        const res = await API.get('/search', { params: { q: `Learn ${search}` } });
        return await res.data.items;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const videoSlice = createSlice({
    name: 'video', initialState,

    reducers: {
        handleSearch: (state, action) => {
            state.search = action.payload;
        },
        onVideoSelect: (state, action) => {
            state.video = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVideos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getVideos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.video = action.payload[0];
                state.videos = action.payload;
            })
            .addCase(getVideos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { handleSearch, onVideoSelect } = videoSlice.actions;

export default videoSlice.reducer;