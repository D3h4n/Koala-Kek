import React, { useEffect } from 'react'
import Post from './Post'

import { TL_Post, User } from '../defintions'

interface Props{
    getUser: (id: string) => Promise<User>
    posts: TL_Post[]
    getPosts: (count: Number) => void
}

const styles:React.CSSProperties = {
    textAlign: 'center',
    margin: '10px',
    fontSize: 'Larger',
    color: 'lightgray'
}

export default function Timeline({ getUser, posts, getPosts}:Props) {
    useEffect(()=>getPosts(-1), [getPosts]);

    return (
        <div className='timeline-container'>
            <div style={styles}>{ posts.length === 0 ? 'Get to posting' : ''}</div>
            { posts.map((post, idx) => <Post key={idx} post={post} getUser={getUser}/>) }
        </div>
    )
}
