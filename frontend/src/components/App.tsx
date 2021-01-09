import React, { useState, useEffect } from 'react'
import Timeline from './Timeline'
import { defaultIcon, defaultUser, User } from '../defintions'
import './App.css'

export default function App() {
    const [user, setUser] = useState<User>(defaultUser)


    useEffect(()=>{
        console.log('App loaded');
        setUser({userID: '1', userName: 'Dehan', icon: defaultIcon });
    }, [])

    return (
        <div>
            <Timeline user={user}/>
        </div>
    )
}
