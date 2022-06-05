import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn, signUp, reset, googleLogin } from "../../featurs/userSlice";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { toast } from "react-toastify";
import google from "./search.png";
import Spinner from "../Spinner";
import { auth } from "../../Firebase";
import "./style.css";

const Auth = () => {
    const dispatch = useDispatch();
    const router = useNavigate();
    const { user, isLoading, isError, message } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({ userName: "", email: "", password: "", password2: "" });
    const { userName, email, password, password2 } = formData;
    const [isSignup, setSginup] = useState(false);
    const [isSignin, setSginin] = useState(false);

    useEffect(() => {
        isError && toast.error(message);

        if (user && isSignin) {
            toast.success("Successful Sign In ");
            router('/');
        }
        if (user && isSignup) {
            toast.success("Successful Sign Up ");
            router('/');
        }
        return () => dispatch(reset());
    }, [user, isSignin, isSignup, isError, dispatch, message, router])

    const handleChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const changeMode = () => { setSginup(!isSignup) }

    const googleSignin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(res =>
                dispatch(googleLogin({ user: res.user.providerData[0], token: res.user.accessToken })),
                router('/')
            ).catch(err => toast.error(err));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { userName, email, password };
        if (isSignup) {
            if (password !== password2) {
                toast.error("Failed! Passwords not matches!!!");
            } else {
                dispatch(signUp(userData));
            }
        } else {
            dispatch(signIn(userData));
            setSginin(true);
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="signup">
            <form className="form" onSubmit={handleSubmit}>
                {isSignup ? (
                    <>
                        <h1 className="form-title"><i className="fa fa-user-plus" aria-hidden="true"></i> Sign up</h1>
                        <label className="db form-lb" htmlFor="userName">User Name</label>
                        <input onChange={handleChange} type="text" className="db form-inp" id="userName" name="userName" placeholder="Please write your name " autoComplete="off" required />
                    </>
                ) : (
                    <h1 className="form-title"><i className="fa fa-sign-in" aria-hidden="true"></i> Sign in </h1>
                )}
                <label className="db form-lb" htmlFor="email">Email Address</label>
                <input onChange={handleChange} type="email" className="db form-inp" id="email" name="email" placeholder="Please write your email " autoComplete="off" required />
                <label className="db form-lb" htmlFor="password">Password</label>
                <input onChange={handleChange} type="password" className="db form-inp" id="password" name="password" placeholder="Please write your password " autoComplete="off" required />
                {isSignup && (
                    <>
                        <label className="db form-lb" htmlFor="password2">Repeat your Password</label>
                        <input onChange={handleChange} type="password" className="db form-inp" id="password2" name="password2" placeholder="Please write your password " autoComplete="off" required />
                    </>
                )}
                <button className="g-btn" onClick={googleSignin} type="button">
                    <span className="g-content">
                        <img className="g-icon" src={google} alt="g-icon" />
                    </span>
                    <span>Log in with google</span>
                </button>
                <button type="submit" className="s-btn">Submit</button>
                <button className="change-btn" onClick={changeMode}> {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"} </button>
            </form>
        </div>
    );
};

export default Auth;
