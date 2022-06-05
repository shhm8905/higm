import { useEffect, useRef, useState } from 'react';
import ImgsData from "./imgsData";
import './style.css';

const Slider = () => {
    let [counter, setCounter] = useState(0);
    const dataCount = ImgsData.length - 1;
    const autoSlide = useRef();

    if (!Array.isArray(ImgsData) || dataCount < 0) {
        alert("There's no data or image !!! ");
    }


    useEffect(() => {
        let isMunted = true;
        if (isMunted) autoSlide.current = handleNext;
        return () => isMunted = false;
    });

    useEffect(() => {
        let isMunted = true;
        setInterval(() => {
            if (isMunted) autoSlide.current();
        }, 7500);
        return () => isMunted = false;
    }, []);

    const handleNext = () => {
        setCounter(counter === dataCount ? 0 : counter + 1);
    }

    return (
        <div className="slider">
            <div className="items">
                {ImgsData.map((item, index) => {
                    return (
                        counter === index && (
                            <figure className={counter === index ? 'item' : 'dn'} key={item.id}>
                                <img className='imgs' src={item.src} alt='img' />
                            </figure>
                        )
                    )
                })}

            </div>
        </div>
    )
}

export default Slider