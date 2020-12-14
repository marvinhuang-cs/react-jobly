import React, { useContext } from 'react'
import './Home.css'
import UserContext from "./UserContext"
import { Link } from "react-router-dom"

//homepage that welcomes user and prompts log in
function Home() {
    const { currentUser } = useContext(UserContext);
    return (
        <div className="home"> 
            <div className="home__container">
                <h1>Jobly</h1>
                <p>All the jobs in one, convenient place.</p>
                {currentUser ? (
                <h1>Welcome back {currentUser.username}!</h1>) : 
                (
                <Link to="/login">
                    <button> Log In </button>
                </Link>
                )}
            </div>
        </div>
    )
}

export default Home
