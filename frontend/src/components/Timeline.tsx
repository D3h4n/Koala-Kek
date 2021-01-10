import React, { useState, useEffect } from 'react'
import Post from './Post'

import { TL_Post, User, defaultIcon } from '../defintions'

interface Props{
    user: User
}

export default function Timeline({ user }:Props) {
    const [ usersMap, setUsersMap ] = useState<Map<string, User>>(new Map());
    const [ posts, setPosts ] = useState<TL_Post[]>([]);

    const getUser = (id: string):User | null => {
        if(id === '1'){
            return{
                userID: '1',
                userName: 'Dehan',
                icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8v9ILAxQmocV9nN7ZOkEOmiiinKz73NFpsw&usqp=CAU"
            }
        }
        else if(id === '2'){
            return{
                userID: '2',
                userName: 'Nerd231',
                icon: defaultIcon
            }
        }
        else if(id === '3'){
            return{
                userID: '3',
                userName: 'Pearson',
                icon: defaultIcon
            }
        }
        else if(id === '4'){
            return{
                userID: '4',
                userName: 'Hackerman',
                icon: defaultIcon
            }
        }
        else{
            return null;
        }
    } 

    useEffect(()=>{
        setPosts([{
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et netus et malesuada fames ac turpis egestas maecenas. Amet luctus venenati",
                userID: "1",
                hasImg: false
            }, 
            {
                text: "I have a dream",
                userID: "2",
                hasImg: false
            }, 
            {
                text: "Coding is super fun",
                userID: "3",
                hasImg: false
            },
            {
                text: "I will hack the world 😎",
                userID: "4",
                hasImg: false
            },
            {
                text: "I don't exist",
                userID: "5",
                hasImg: false
            },
            {
                text: "This is my second post",
                userID: "1",
                hasImg: true,
                imgs: [defaultIcon, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8v9ILAxQmocV9nN7ZOkEOmiiinKz73NFpsw&usqp=CAU"]
            },
            {
                text: '#new profile pick',
                userID: '4',
                hasImg: true,
                imgs: [defaultIcon]
            }
        ]);
    }, [user])

    useEffect(()=>{
        let map:Map<string, User> = new Map();
        let newUser:User|null;

        posts.forEach((post)=>{
            if(!map.has(post.userID)){
                newUser = getUser(post.userID);

                if(newUser){
                    map.set(post.userID, newUser);
                }
            }
        })

        setUsersMap(map);
    }, [posts]);

    return (
        <div className='timeline-container'>
            { posts.map((post, idx) => <Post key={idx} post={post} user={usersMap.get(post.userID)}/>) }
        </div>
    )
}
