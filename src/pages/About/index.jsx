import Slider from '../../components/Slider';
import './style.css';

const About = () => {
    return (
        <div className="about">
            <header className='about-header'>
                <h1 className="about-title">Welcome To HIGM Site</h1>
                <p className="about-desc">HIGM group gives you full-time help with your courses with our programming experts</p>
            </header>
            <Slider />
        </div>
    )
}

export default About