import { NavLink } from 'react-router-dom';
import video from './videos/header.mp4';
import Courses from '../../components/Courses';
import './style.css';

const Home = () => {
    return (
        <div className="home">
            <header className='home-header'>
                <video className='home-video' src={video} autoPlay loop muted />
                <div className="home-content">
                    <h1 className="home-title">Welcome To <span>HIGM</span> Best Programming Group</h1>
                    <p className='home-desc'> Here you can see our courses and can participate in them. <br /> Contact us for more info or if you need help.</p>
                    <NavLink className='home-contact' to="/contact"> Contact us </NavLink>
                </div>
            </header>
            <Courses />
        </div>
    )
}

export default Home;