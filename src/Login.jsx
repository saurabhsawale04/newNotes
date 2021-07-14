import { useState } from "react";
import React from "react";
import { auth } from './firebase_config';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setError] = useState(false);
    const [msg, setMsg] = useState('');


    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password)
            setError(false);
            setMsg('');
            history.push('/note');

        } catch (err) {

            setError(true);
            setMsg(err.message)

        }


    }


    return (
        <div className='dfrm'>
            <form onSubmit={(e) => handleSubmit(e)} className='frm'>
                <h1 className='hfrm'>Login Here</h1>
                <div className='ip'>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' />
                </div>
                {err ? <div  style={{color:'red'}}>{msg}</div> : null}

                <div>
                    <Button type='submit'>login</Button>
                </div>

            </form>
        </div>
    );
}

export default Login;