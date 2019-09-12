import React from 'react';
import logo from '../../assets/images/thumbs-up-logo.png';
import classes from './Navbar.module.css';

const Navbar = props => {
    return (
        <header>
            <div className={classes.NavigationBar}>
                <a href="/"><img alt='Inventory Application Logo' src={logo}/></a>
                <div className={classes.NavigationContainer}>
                    <h1>Inventory Application</h1>
                </div>
            </div>
        </header>
    );
};

export default Navbar;