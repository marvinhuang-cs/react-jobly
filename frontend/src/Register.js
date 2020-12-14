import React, {useState} from 'react'
import { useHistory } from "react-router-dom"
import JoblyApi from './Api'
import './Register.css'
import Alert from './Alert'

//registration for new users, sets the token after registering
function Register({setToken}) {
    const history = useHistory();
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        errors: []
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginInfo(l => ({ ...l, [name]: value }));
      }

    async function handleSubmit(e) {
        e.preventDefault();
        let data;
        let endpoint;
        let token;

        data = {
            username: loginInfo.username,
            password: loginInfo.password,
            first_name: loginInfo.first_name || undefined,
            last_name: loginInfo.last_name || undefined,
            email: loginInfo.email || undefined
          };

        endpoint = "register";

        try {
            token = await JoblyApi[endpoint](data);
          } catch (errors) {
            return setLoginInfo(l => ({ ...l, errors }));
          }
          
        setToken(token);
        history.push("/jobs");
    }
      
    return (
        <div className="form__container">
        <form className="form" onSubmit={handleSubmit}>
        <h1>Register</h1>

            <div className="form__group">
            <label htmlFor="firsrt_name">First Name</label>
            <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={loginInfo.first_name}
                onChange={handleChange}
            />
            </div>

            <div className="form__group">
            <label htmlFor="last_name">Last Name</label>
            <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={loginInfo.last_name}
                onChange={handleChange}
            />
            </div>

            <div className="form__group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginInfo.email}
                onChange={handleChange}
            />
            </div>

            <div className="form__group">
            <label htmlFor="username">Username*</label>
                <input 
                type="text" 
                name="username"
                placeholder="Username"
                value={loginInfo.username}
                onChange={handleChange} 
            />
            </div>

            <div className="form__group">
            <label htmlFor="password">Password*</label>
            <input 
                type="password" 
                name="password"
                placeholder="Password"
                value={loginInfo.password}
                onChange={handleChange}
            />
            </div>

            {loginInfo.errors.length ? (
                <Alert type="danger" messages={loginInfo.errors} />
              ) : null}

            <button type="submit" className="form__button">Sign Up</button>
        </form>
        </div>
    )
}

export default Register
