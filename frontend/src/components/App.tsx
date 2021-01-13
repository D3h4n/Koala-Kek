import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Timeline from './Timeline'
import AddPost from './AddPost'
import SignIn from './SignIn'
import { defaultUser, User } from '../defintions'
import './App.css'

import axios from 'axios'

export default function App() {
    const [user, setUser] = useState<User>(defaultUser)
    const [redirect, setRedirect] = useState<Boolean>(false)

    async function getUser(id: string):Promise<User> {
        let user:User;

        user = await axios.get(`http://localhost:5050/api/user/id=${id}`)
            .then(res => JSON.parse(res.data))
            .catch(err => console.error(err))

        if(user){
            return user;
        }
        else{
            return defaultUser;
        }
    }

    async function returnUserID(id: string){
        let user:User = await getUser(id);
        setUser(user);
        if(user !== defaultUser){
            setRedirect(true);
        }
        else{
            console.error('Login ID not found');
        }
    }

    return (
        <div className='app-container'>
            <Router>
            <Switch>
                <Route exact path='/'>
                    <Redirect to='/Main'/>
                </Route>
                <Route path='/SignIn'>
                    <SignIn returnUserID={returnUserID}/>
                    { redirect ? <Redirect to='/Main' /> : '' }
                </Route>
                <Route path='/Main'>
                    { user.userID === '-1' ? <Redirect to='/SignIn' />  : ''}
                    <div className='main-page-container'>
                        <Timeline user={user} getUser={getUser}/>
                        <AddPost user = {user}/>
                    </div>
                </Route>
            </Switch>
            </Router>
        </div>
    )
}
