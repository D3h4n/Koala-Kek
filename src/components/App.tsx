import React, { useState,  useCallback, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import Timeline from './Timeline'
import AddPost from './AddPost'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Logout from './Logout'
import { defaultUser, TL_Post, User, apiSrc, loginKey } from '../defintions'
import './App.css'

import axios from 'axios'

function hasKey<O>(obj: O, key: string | number | symbol): key is keyof O{
    return key in obj
}

export function handleChange (
            event: React.ChangeEvent<any>, 
            stateFunction: React.Dispatch<React.SetStateAction<any>>, 
            prevState: Object, 
            textLimit: number
        ){
    let { value, name } = event.target;

    if(hasKey(prevState, name)){
        stateFunction({...prevState, [name]: value.slice(0, Math.min(textLimit, value.length))});
    }
}

export default function App() {
    const [user, setUser] = useState<User>(defaultUser);
    const [posts, setPosts] = useState<TL_Post[]>([]);
    let history = useHistory();

    const getUser = useCallback((id: string):Promise<User> => {
        return new Promise<User>((resolve, reject)=>{
            axios.get(`${apiSrc}/user/`, {params: {id}})
                .then(res => JSON.parse(res.data))
                .then(res => resolve(res))
                .catch(err => reject(err))
        });
    }, []);

    const returnUserID = useCallback(async (id: string, rememberSignIn: boolean = false) => {
        let user:User = await getUser(id);

        setUser(user);

        if(user !== defaultUser){
            if(rememberSignIn){
                localStorage.setItem(loginKey, user.userID);
            }
        }
        else{
            console.error('Login ID not found');
        }
    }, [getUser]);

    const getPosts = useCallback((count: Number) => {
        axios.get(`${apiSrc}/posts/`, {
            params: {
                id: user.userID,
                count: count
            }
        })
            .then(res => JSON.parse(res.data))
            .then((res: TL_Post[]) => setPosts(res))
            .catch(err => console.log(err))
    }, [user]);

    const handlePost = useCallback((post:TL_Post) => {
        setPosts([post, ...posts]);
    }, [posts])

    useEffect(() => {
        let id: string | null = localStorage.getItem(loginKey);
        if(id != null){
            getUser(id)
                .then(user => {
                    if(user){
                        setUser(user);
                        history.push('/main');
                    }
                    else{
                        history.push('/sign-in');
                    }
                })
                .catch(err => console.error(err))
        }
        else{
            history.push('/sign-in');
        }
    }, [getUser, history])

    return (<Switch>
                <Route exact path='/'>
                    <h1>Loading</h1>
                </Route>
                <Route path='/sign-in'>
                    <SignIn returnUserID={returnUserID}/>
                </Route>
                <Route path='/main'>
                    <div className='main-page-container'>
                        <Timeline getUser={getUser} posts={posts} getPosts={getPosts}/>
                        <AddPost user = {user} handlePost={handlePost}/>
                        <Logout />
                    </div>
                </Route>
                <Route path='/sign-up'>
                    <SignUp returnUserID={returnUserID} />
                </Route>
                <div style={{position: 'absolute', bottom:'0', left:'10px'}}>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </Switch>)
}
