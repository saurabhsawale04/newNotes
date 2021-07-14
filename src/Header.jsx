import React from 'react';
import ss from './images/ss.jpg';

const Header = () => {
    return(
        <div className="head">
            <img src={ss} alt='logo' className='img'></img>
            <h1>SSS Notes</h1>
        </div>
    );
}

export default Header;