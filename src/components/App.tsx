import React, { useState,  useCallback, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import axios from 'axios'

import SignIn from './SignIn'
import SignUp from './SignUp'
import Main from './Main'

import { defaultUser, User } from '../defintions'

function hasKey<O>(obj: O, key: string | number | symbol): key is keyof O{
    return key in obj
}

export function handleChange (
            event: React.ChangeEvent<any>, 
            stateFunction: React.Dispatch<React.SetStateAction<any>>, 
            prevState: Object
        ){
    let { value, name } = event.target;

    if(hasKey(prevState, name)){
        stateFunction({...prevState, [name]: value});
    }
}

export default function App() {
    const [user, setUser] = useState<User>(defaultUser);
    let history = useHistory();

    const getUser = useCallback((id: string):Promise<User> => {
        return new Promise<User>((resolve, reject)=>{
            axios.get(`${process.env.REACT_APP_API_URI}/user/`, {params: {id}})
                .then(res => JSON.parse(res.data))
                .then(res =>  resolve(res))
                .catch(err => reject(err))
        });
    }, []);

    const returnUserID = useCallback(async (id: string, rememberSignIn: boolean = false) => {
        let user:User = await getUser(id);

        if(user){
            setUser(user);
            if(rememberSignIn){
                localStorage.setItem(process.env.REACT_APP_LOGIN_KEY as string, user._id);
            }
        }
        else{
            console.error('User ID not found');
        }
    }, [getUser]);

    useEffect(() => {
        let id: string | null = localStorage.getItem(process.env.REACT_APP_LOGIN_KEY as string);
        if(id != null){
            getUser(id)
                .then(user => {
                    if(user){
                        setUser(user);
                        history.replace('/main');
                    }
                    else{
                        history.replace('/sign-in');
                    }
                })
                .catch(err => console.error(err))
        }
        else{
            history.replace('/sign-in');
        }
    }, [getUser, history])

    return (
        <Switch>
            <Route exact path='/'>
                <h1>Error</h1>
                <p>If you're seeing this page there has either been an outage or the server is taking unusually long to respond</p>
            </Route>
            <Route path='/sign-in'>
                <SignIn returnUserID={returnUserID}/>
            </Route>
            <Route path='/main'>
                <Main user={user} getUser={getUser}/>
            </Route>
            <Route path='/sign-up'>
                <SignUp returnUserID={returnUserID} />
            </Route>
        </Switch>
    )
}
