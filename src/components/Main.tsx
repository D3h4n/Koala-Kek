import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

import Timeline from './Timeline'
import AddPost from './AddPost'
import SideBar from './SideBar'
import { User, TL_Post } from '../defintions'
import { useHistory } from 'react-router-dom'

interface Props{
    getUser: (id: string) => Promise<User>
    user: User
}

export default function Main({user, getUser }: Props) {
    const [posts, setPosts] = useState<TL_Post[]>([])

    let history = useHistory();
    
    function handleLogout(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        localStorage.clear();
        history.push('/sign-in');
    }

    const handleNewPost = useCallback((post: TL_Post)=>{
        setPosts([post, ...posts]);
    }, [posts])

    const getPosts = useCallback((count: Number) => {
        axios.get(`${process.env.REACT_APP_API_URI}/posts/`, {
            params: {
                id: user._id,
                count: count
            }
        })
            .then(res => JSON.parse(res.data))
            .then((res: TL_Post[]) => setPosts(res))
            .catch(err => console.log(err))
    }, [user]);
    
    useEffect(()=>{
        getPosts(-1);
    }, [getPosts]);

    return (
        <div className='main-page'>
            <Timeline getUser={getUser} posts={posts} />
            <SideBar handleLogout={handleLogout}/>
            <AddPost user = {user} handleNewPost={handleNewPost}/>
        </div>
    )
}
