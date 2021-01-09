import React from 'react'

import { TL_Post, User, defaultIcon } from '../defintions'

interface Props{
    post: TL_Post
    user: User | undefined
}

export default function Post({ post, user }: Props) {
    return (
        <div className='post'>
            <img src={user ? user.icon : defaultIcon} alt='user icon' className='post-user-icon'/>
            <h3 className='post-user-name'>{user ? user.userName : 'unknown'}</h3>
            <p className='post-text'>{post.text}</p>
        </div>
    )
}
