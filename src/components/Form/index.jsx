import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';
import './style.css';

const Form = () => {
    const form = useRef();
    const [isLoading, setLoading] = useState(false);

    const ServiceId = process.env?.REACT_APP_SERVICE_ID;
    const TemplateId = process.env?.REACT_APP_TEMPLATE_ID;
    const PublicKey = process.env?.REACT_APP_PUBLIC_KEY;

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        emailjs.sendForm(ServiceId, TemplateId, form.current, PublicKey)
            .then((result) => {
                toast.success('Your email has been send');
                setLoading(false);
            }, (error) => {
                toast.error(error);
            });
    };

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="container">
            <form ref={form} className='form' onSubmit={sendEmail}>
                <h1 className="form-title">Contact us</h1>
                <label className='form-label' htmlFor="name">Name</label>
                <input className='form-inp' type="text" name="name" id="name" autoComplete='off' placeholder='Please write your name' />
                <label className='form-label' htmlFor="email">Email Address</label>
                <input className='form-inp' type="text" name="email" id="email" autoComplete='off' placeholder='Please write your name' />
                <label className='form-label' htmlFor="subject">Subject</label>
                <textarea className='form-inp' name='subject' id='subject' rows='3' />
                <button className='send-btn' type='submit' >Send</button>
            </form>
        </div>

    )
}

export default Form;