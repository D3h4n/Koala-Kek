import React, { useState } from 'react'
import Timeline from './Timeline'
import AddPost from './AddPost'
import SignIn from './SignIn'
import { defaultIcon, defaultUser, User } from '../defintions'
import './App.css'

export default function App() {
    const [isLogged, setLogged] = useState<Boolean>(false);
    const [user, setUser] = useState<User>(defaultUser)

    const getUser = (id: string):User | null => {
        if(id === '1'){
            return{
                userID: '1',
                userName: 'Dehan',
                icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8v9ILAxQmocV9nN7ZOkEOmiiinKz73NFpsw&usqp=CAU"
            }
        }
        else if(id === '2'){
            return{
                userID: '2',
                userName: 'Nerd231',
                icon: defaultIcon
            }
        }
        else if(id === '3'){
            return{
                userID: '3',
                userName: 'Pearson',
                icon: defaultIcon
            }
        }
        else if(id === '4'){
            return{
                userID: '4',
                userName: 'Hackerman',
                icon: defaultIcon
            }
        }
        else{
            return null;
        }
    }

    function returnUserID(id: string){
        setUser(getUser(id) as User);
        setLogged(true);
    }

    return (
        <div className='app-container'>
            <section className='sign-in-container' style={{display: isLogged ? 'none' : 'block'}}>
                <SignIn returnUserID={returnUserID}/>
            </section>
            <section className='main-page-container' style={{display: isLogged ? 'block' : 'none'}}>
                <Timeline user={user} getUser={getUser}/>
                <AddPost user = {user}/>
            </section>
        </div>
    )
}
