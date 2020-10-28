import React, { useState, useContext, useEffect, useRef } from 'react'
import JoblyApi from './Api'
import UserContext from './UserContext'
import Alert from './Alert'

function Profile() {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const [userForm, setUserForm] = useState({
        first_name: currentUser.first_name || "",
        last_name: currentUser.last_name || "",
        email: currentUser.email || "",
        photo_url: currentUser.photo_url || "",
        username: currentUser.username,
        password: "",
        errors: [],
        saveConfirmed: false
      });
    
    function handleChange(e) {
        const { name, value } = e.target;
        setUserForm(f => ({
          ...f,
          [name]: value,
          errors: []
        }));
      }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let profileData = {
              first_name: userForm.first_name || undefined,
              last_name: userForm.last_name || undefined,
              email: userForm.email || undefined,
              photo_url: userForm.photo_url || undefined,
              password: userForm.password
            };

            let username = userForm.username;
            let updatedUser = await JoblyApi.saveProfile(username, profileData);
            console.log("UPDATED USER", updatedUser)
            setUserForm(f => ({
              ...f,
              errors: [],
              saveConfirmed: true,
              password: ""
            }));
            setCurrentUser(updatedUser);
          } catch (errors) {
            setUserForm(f => ({ ...f, errors }));
          }
    }

    return (
        <div className="form__container">
            <form className="form" onSubmit={handleSubmit}>

            <div className="form__group">
            <label htmlFor="username">Username*</label>
            <p>{userForm.username}</p>
            </div>

            <div className="form__group">
            <label htmlFor="firsrt_name">First Name</label>
            <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={userForm.first_name}
                onChange={handleChange}
            />
            </div>

            <div className="form__group">
            <label htmlFor="last_name">Last Name</label>
            <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={userForm.last_name}
                onChange={handleChange}
            />
            </div>

            <div className="form__group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={userForm.email}
                onChange={handleChange}
            />
            </div>

            <div className="form__group">
            <label htmlFor="photo_url">Photo URL</label>
            <input 
                type="text" 
                name="photo_url"
                placeholder="Photo URL"
                value={userForm.photo_url}
                onChange={handleChange}
            />
            </div>

            <div className="form__group">
            <label htmlFor="password">Password*</label>
            <input 
                type="password" 
                name="password"
                placeholder="Password"
                value={userForm.password}
                onChange={handleChange}
            />
            </div>

            {userForm.errors.length ? (
                <Alert type="danger" messages={userForm.errors} />
              ) : null}

            <button>Submit Changes</button>
            </form>
        </div>
    )
}

export default Profile
