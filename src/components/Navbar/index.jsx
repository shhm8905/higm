import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from '../../featurs/userSlice';
import decode from 'jwt-decode';
import './style.css';

const Navbar = () => {

    const { user } = useSelector(state => state.user);
    const [isLogout, setLogout] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const [isChecked, setisChecked] = useState(false);
    const dispatch = useDispatch(), router = useNavigate(), location = useLocation();

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) return dispatch(logout());
        }
        if (user) {
            setLogout(false);
        } else {
            setLogout(true);
        }
        if (user?.email === 'hazem-khalil@hotmail.com') {
            setAdmin(true);
        } else {
            setAdmin(false);
        }
        if (location) {
            setisChecked(false);
        }

    }, [user, setLogout, dispatch, setAdmin, location])

    const handleLogout = () => {
        if (isLogout) {
            router('/auth');
        } else {
            localStorage.removeItem('user');
            setTimeout(() => {

                dispatch(logout());
                setLogout(true);
                router('/');
            }, 50)
        }
    }

    const handleChange = e => {
        setisChecked(e.target.checked);
    }

    return (
        <div className="navbar" >
            <NavLink to='/' className="logo">
                <h1>HIGM</h1>
            </NavLink>

            <input onChange={handleChange} checked={isChecked} type="checkbox" className="box" id="box" />
            <label className="label" htmlFor="box"></label>

            <nav className="nav">
                {!isLogout && (
                    <li className="li">
                        <div className="userName">
                            {user?.img ? (
                                <img className="avatar" src={user.img} alt={user.userName} />
                            ) : (
                                <p>{user?.userName?.charAt(0)}</p>
                            )}
                            <span>{user?.userName}</span>
                        </div>
                    </li>
                )}
                <li className="li"><NavLink className='link' to='/' >Home</NavLink></li>
                <li className="li"><NavLink className='link' to='/about' >About</NavLink></li>
                <li className="li"><NavLink className='link' to='/contact' >Contact</NavLink></li>
                {(isAdmin && !isLogout) && (
                    <li className="li"><NavLink className='link' to='/courses' >Courses</NavLink></li>
                )}
                <button className="logout-btn" onClick={handleLogout}>{isLogout ? 'Login' : 'Logout'}</button>
            </nav>
        </div>
    )
}

export default Navbar;