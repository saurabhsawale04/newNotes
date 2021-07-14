
import Header from './Header';
import Footer from './Footer';
import Write from './Write';
import Login from './Login';
import { useState, useEffect } from "react";
import React from "react";
import {auth} from './firebase_config';
import Navbar from './Navbar';
import { Switch, Route} from 'react-router-dom';
import Signup from './Signup';
import Home from './Home';

const App = () => {
     const [user, setUser] = useState(null);
     useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user) setUser(user)
            else setUser(null)
        })
     },[])

    return (
        <div className='app'>
            <Header />
            <Navbar user={user}/>
            <Switch>
            <Route exact path='/'><Home/></Route>
            <Route exact path='/note'><Write user={user}/></Route>
            <Route exact path='/login'><Login/></Route>
            <Route exact path='/signup'><Signup/></Route>
            </Switch>
            <Footer />
        </div>
    );

    
}

export default App;