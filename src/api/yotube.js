import axios from "axios";
const KEY = "AIzaSyD06htGT8DjQQbEIuekJo7lc_KiNVSMmAo";

export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        part: "snippet",
        maxResults: 5,
        key: KEY,
        type: "video",
    },
});