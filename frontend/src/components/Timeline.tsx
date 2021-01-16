import React, { useEffect, useState } from 'react'
import Post from './Post'

import { defaultUser, TL_Post, User } from '../defintions'

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
    const [userMap, setUserMap] = useState<Map<string, User>>(new Map());
    useEffect(()=>getPosts(-1), [getPosts]);

    function getUserFromMap(id: string):Promise<User>{
        return new Promise<User>((resolve, reject)=>{
            if(userMap.has(id)){
                resolve(userMap.get(id) as User);
            }
            else{
                getUser(id)
                    .then(res => {
                        if(res !== defaultUser){
                            let newMap:Map<string, User> = userMap;

                            newMap.set(res.userID, res);

                            setUserMap(newMap);
                        }
                        resolve(res);
                    })
                    .catch(err=>console.error(err))
            }
        })
    }

    return (
        <div className='timeline-container'>
            <div style={styles}>{ posts.length === 0 ? 'Get to posting' : ''}</div>
            { posts.map((post, idx) => <Post key={idx} post={post} getUser={getUserFromMap}/>) }
        </div>
    )
}
