import React from 'react'

import Timeline from './Timeline'
import AddPost from './AddPost'
import { TL_Post, User } from '../defintions'
import { useHistory } from 'react-router-dom'

interface Props{
    getUser: (id: string) => Promise<User>
    posts: TL_Post[]
    getPosts: (count: number) => void
    user: User
    handlePost: (post: TL_Post) => void
}

export default function Main({user, posts, getUser, getPosts, handlePost}: Props) {
    let history = useHistory();
    function handleLogout(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        localStorage.clear();
        history.push('/sign-in');
    }

    return (
        <div className='main-page'>
            <Timeline getUser={getUser} posts={posts} getPosts={getPosts}/>
            <AddPost user = {user} handlePost={handlePost}/>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
    )
}
