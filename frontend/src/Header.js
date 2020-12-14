import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import './Header.css'
import UserContext from "./UserContext"

//header navbar that links to home, companies, jobs, profile, login/logout
function Header({handleLogOut}) {
    const { currentUser } = useContext(UserContext);
    function loggedInNav() {
        return (
            <div className="header">
                <Link to="/">
                    <span className="header__logo"> Jobly </span>
                </Link>
                <div className="header__nav">
                    <Link to="/companies">
                        <span className="header__option"> Companies </span>
                    </Link>
                    <Link to="/jobs">
                        <span className="header__option"> Jobs </span>
                    </Link>
                    <Link to="/profile">
                        <span className="header__option"> Profile </span>
                    </Link>
                    <Link to="/" onClick={handleLogOut}>
                        <span className="header__option"> Log Out </span>
                    </Link>
                </div>
            </div>
        )
    }

    function loggedOutNav() {
        return (
            <div className="header">
                    <Link to="/">
                        <span className="header__logo"> Jobly </span>
                    </Link>

                    <div className="header__nav">
                    <Link to="/register">
                        <span className="header__option"> Register </span>
                    </Link>
                    <Link to="/login">
                        <span className="header__option"> Log In </span>
                    </Link>
                    </div>
            </div>
        )
    }

    return (
        <div>
        {currentUser ? loggedInNav() : loggedOutNav()}
        </div>
    )

}

export default Header
