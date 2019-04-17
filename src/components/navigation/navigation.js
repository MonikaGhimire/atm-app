import React from 'react';
import './navigation.css';
import { NavLink } from 'react-router-dom';
//import Nav from 'react-bootstrap/Nav';

const navigation = (props) => {
    return (
        <div className="navigation" defaultactivekey="/">
            <NavLink to="/" exact >ADMIN</NavLink>
            <NavLink to="/atm">ATM</NavLink>
        </div>
    );
}

export default navigation;