import { useState } from "react";
import React from "react";
import {auth} from './firebase_config';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';


const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [err, setError] = useState(false);
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await auth.createUserWithEmailAndPassword(email, password)
            alert('congrats you have successfully sign in !!')
            setError(false);
            setMsg('');
              history.push('/');
              
            
        }catch(err){
            
            setError(true);
            setMsg(err.message)
            
        }

     
        
    }

    return (

        <div className='dfrm'>
            <form onSubmit={(e) => handleSubmit(e)} className='frm'>
                <h1 className='hfrm'>Sign up here</h1>
                <div className='ip'>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' />
                </div>
                {err ? <div  style={{color:'red'}}>{msg}</div> : null}

                <div>
                    <Button type='submit'>Signup</Button>
                </div>

            </form>
        </div>
    );
}

export default Signup;