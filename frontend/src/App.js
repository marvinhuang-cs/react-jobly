import React, {useState, useEffect} from 'react'
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import JoblyApi from './Api'
import Header from './Header'
import Home from './Home'
import Companies from './Companies'
import Company from './Company'
import Jobs from './Jobs'
import LogIn from './LogIn'
import useLocalStorage from './hooks/useLocalStorage'
import UserContext from "./UserContext"
import { decode } from "jsonwebtoken"
import Register from './Register'
import Profile from './Profile'
import { ClipLoader } from "react-spinners"

function App() {
  
  //loading symbol if info is not ready
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  const handleLogOut = () => {
    setCurrentUser(null);
    setToken(null);
  };

  //gets the current user from token
  useEffect(() => {
    async function getCurrentUser() {
      try {
        let { username } = decode(token);
        let currentUser = await JoblyApi.getCurrentUser(username);
        setCurrentUser(currentUser);
      } catch (err) {
        setCurrentUser(null);
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  if (!infoLoaded) {
    return <ClipLoader size={150} color="#123abc" />;
  }

  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
      <Header handleLogOut={handleLogOut}/>

      <Switch>
        <Route path="/companies/:handle"> <Company/> </Route>
        <Route path="/companies"> <Companies/> </Route>
        <Route path="/jobs"> <Jobs/> </Route>
        <Route path="/profile"> <Profile/> </Route>
        <Route path="/login"> <LogIn setToken={setToken}/> </Route>
        <Route path="/register"> <Register setToken={setToken}/> </Route>
        
        <Route path="/"><Home/></Route>

      </Switch>
      </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
export const TOKEN_STORAGE_ID = "jobly-token";