import React, { useState, useEffect } from 'react'

import { TL_Post, User, defaultUser } from '../defintions'

interface Props{
    post: TL_Post
    getUser: (id: string) => Promise<User>
}

export default function Post({ post, getUser }: Props) {
    const [user, setUser] = useState<User>(defaultUser);

    useEffect(()=>{
        getUser(post.userID)
            .then((user)=>{
                setUser(user);
            })
    }, [post, getUser])

    return (
        <div className='post'>
            <img src={user.icon } alt='user icon' className='post-user-icon'/>
            <h3 className='post-user-name'>{user.userName}</h3>
            <hr className='post-hr'/>
            <p className='post-text'>{post.text}</p>
            { post.hasImg ? 
                <div className='post-image-container'>
                    { post.imgs?.map((image, idx) => <img key={idx} src={image} alt='post' className='post-image'/>) }
                </div> 
                : '' 
            }
        </div>
    )
}
