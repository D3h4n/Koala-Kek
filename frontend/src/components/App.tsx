import React, { useState, useEffect } from 'react'
import { post } from '../interfaces'

export default function App() {
    const [posts, setPosts] = useState<post[]>([]);

    useEffect(()=>{
        console.log('App loaded');
        
        let post1:post = {
            text: "I like cheese",
            userID: "1",
            hasImg: false
        }

        let post2:post = {
            text: "I have a dream",
            userID: "2",
            hasImg: false
        }

        let post3:post = {
            text: "Coding is super fun",
            userID: "3",
            hasImg: false
        }

        setPosts([post1, post2, post3]);
    }, [])

    const timelinePosts = posts.map((post, idx) => {
        return (<div key = {idx}>
            <h4>User: {post.userID}</h4>
            <p>{post.text}</p>
        </div>)
    })
    
    return (
        <div>
            { timelinePosts }
        </div>
    )
}
