import React, {useState} from 'react'
import { useHistory } from "react-router-dom"
import './LogIn.css'
import JoblyApi from './Api'
import Alert from './Alert'

//login page with verification
function LogIn({setToken}) {
    const history = useHistory();
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
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
            password: loginInfo.password
        };
        endpoint = "login";

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
        <h1>Sign In</h1>

            <div className="form__group">
            <label>Username</label>
            <input 
                type="text" 
                name="username"
                placeholder="Username"
                value={loginInfo.username}
                onChange={handleChange} 
            />
            </div>

            <div className="form__group">
            <label>Password</label>
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
              
            <button type="submit">Sign In</button>
        </form>
        </div>
    )
}

export default LogIn
