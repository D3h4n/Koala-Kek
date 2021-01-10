import React, { useState, useEffect } from 'react'
import Timeline from './Timeline'
import AddPost from './AddPost'
import { defaultIcon, defaultUser, User } from '../defintions'
import './App.css'

export default function App() {
    const [user, setUser] = useState<User>(defaultUser)

    function getUser(): User{
        return user;
    }

    useEffect(()=>{
        console.log('App loaded');
        setUser({userID: '1', userName: 'Dehan', icon: defaultIcon});
    }, [])

    return (
        <div className='app-container'>
            <Timeline user={user}/>
            <AddPost getUser = {getUser}/>
        </div>
    )
}
