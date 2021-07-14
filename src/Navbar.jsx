import React from 'react';
import { NavLink } from 'react-router-dom';
import {auth} from './firebase_config';
import { useHistory } from 'react-router-dom';

const Navbar = ({user}) => {
    const history  = useHistory();
    return(
        <div className="nav">
        {user ? <NavLink exact to='/login' activeClassName='anl' className="nl" onClick={()=>{
            auth.signOut()
            history.push('/login')
        }}>Logout</NavLink> : 
        <>
            <NavLink exact to='/login' activeClassName='anl' className="nl">Login</NavLink>
            <NavLink exact to='/signup' activeClassName='anl' className="nl">Signup</NavLink>
        </>
        }
            
        </div>
    );
}

export default Navbar;