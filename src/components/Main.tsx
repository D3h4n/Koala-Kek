import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

import Timeline from './Timeline'
import AddPost from './AddPost'
import { User, TL_Post, apiSrc } from '../defintions'
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
        axios.get(`${apiSrc}/posts/`, {
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
            <button onClick={handleLogout} className="logout-btn">Logout</button>
            <AddPost user = {user} handleNewPost={handleNewPost}/>
        </div>
    )
}
