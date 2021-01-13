import React, { useState, useEffect, useRef } from 'react'
import Post from './Post'
import axios from 'axios'

import { TL_Post, User } from '../defintions'

interface Props{
    user: User
    getUser: (id: string) => Promise<User>
}

export default function Timeline({ user, getUser }:Props) {
    const [ posts, setPosts ] = useState<TL_Post[]>([]);
    const isMountedRef = useRef<boolean>(false);

    function getPosts(count: Number){
        axios.get(`http://localhost:5050/api/posts/id=${user.userID}&count=${count}`)
            .then(res => JSON.parse(res.data))
            .then(res =>{
                if(isMountedRef){
                    setPosts(res);
                }
            })
            .catch(err => console.log(err))
    }

    // eslint-disable-next-line
    useEffect(() => getPosts(20), []);

    return (
        <div className='timeline-container'>
            { posts.map((post, idx) => <Post key={idx} post={post} getUser={getUser}/>) }
        </div>
    )
}
