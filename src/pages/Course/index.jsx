import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideos, onVideoSelect } from '../../featurs/videoSlice';
import Spinner from '../../components/Spinner';
import './style.css';

const Course = () => {
    const { videos, video, isLoading, search } = useSelector(state => state.video);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideos(search));
    }, [dispatch, search]);

    if (isLoading) {
        return <Spinner />
    }

    const vidSrc = `https://www.youtube.com/embed/${video?.id?.videoId}`;
    const vidTitle = video?.snippet?.title;

    return (
        <div className="Course">
            <div className='video'>
                <iframe className='video-content' src={vidSrc} title={vidTitle} />
            </div>
            <div className="videos">
                {videos.length > 0 && videos.map(item => {
                    const img = item.snippet.thumbnails.medium.url;
                    const vidTitle = item.snippet.title;
                    return (
                        <div className="video-item" onClick={() => dispatch(onVideoSelect(item))} key={item.etag}>
                            <figure><img src={img} alt="img" /></figure>
                            <p> {vidTitle} </p>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Course;