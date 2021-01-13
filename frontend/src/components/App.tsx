import React, { useState,  useCallback } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Timeline from './Timeline'
import AddPost from './AddPost'
import SignIn from './SignIn'
import { defaultUser, TL_Post, User } from '../defintions'
import './App.css'

import axios from 'axios'

export const apiSrc = 'http://localhost:5050/api/';

export default function App() {
    const [user, setUser] = useState<User>(defaultUser)
    const [redirect, setRedirect] = useState<Boolean>(false)
    const [posts, setPosts] = useState<TL_Post[]>([])

    const getUser = useCallback(async(id: string):Promise<User> => {
        let user:User;

        user = await axios.get(`${apiSrc}user/id=${id}`)
            .then(res => JSON.parse(res.data))
            .catch(err => console.error(err))

        if(user){
            return user;
        }
        else{
            return defaultUser;
        }
    }, []);

    const returnUserID = useCallback(async (id: string) => {
        let user:User = await getUser(id);
        setUser(user);

        if(user !== defaultUser){
            setRedirect(true);
        }
        else{
            console.error('Login ID not found');
        }
    }, [getUser]);

    const getPosts = useCallback((count: Number) => {
        axios.get(`${apiSrc}posts/id=${user.userID}&count=${count}`)
            .then(res => JSON.parse(res.data))
            .then((res: TL_Post[]) => setPosts(res))
            .catch(err => console.log(err))
    }, [user]);

    const handlePost = useCallback((post:TL_Post) => {
        setPosts([post, ...posts]);
    }, [posts])

    return (
        <div className='app-container'>
            <Router>
            <Switch>
                <Route exact path='/'>
                    <Redirect to='/Main'/>
                </Route>
                <Route path='/SignIn'>
                    <SignIn returnUserID={returnUserID}/>
                    { redirect ?<Redirect to='/Main'/> : '' }
                </Route>
                <Route path='/Main'>
                    { user.userID === '-1' ? <Redirect to='/SignIn'/> : ''}
                    <div className='main-page-container'>
                        <Timeline getUser={getUser} posts={posts} getPosts={getPosts}/>
                        <AddPost user = {user} handlePost={handlePost}/>
                    </div>
                </Route>
            </Switch>
            </Router>
        </div>
    )
}
