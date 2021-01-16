import React, { useState, useRef } from 'react'

import { handleChange } from './App'
import { apiSrc, SignUpData } from '../defintions'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

var md5 = require('md5');

interface Props{
    returnUserID: (userID: string) => void
}

export default function SignUp({ returnUserID }:Props) {
    const [formData, setData] = useState<SignUpData>({userName: '', passWord: '', displayName: ''})
    
    const [exists, setExists] = useState<boolean>(false);

    let redirect = useRef<boolean>(false)

    function checkUsername(userName: string):Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            axios.get(`${apiSrc}/username/`,{
                params: {
                    userName
                }
            })
            .then(res => JSON.parse(res.data))
            .then((res:boolean) => {
                resolve(res);
            })
            .catch(err=>{
                console.error(err);
                reject(err);
            })
        })
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault() 

        if(formData.userName && formData.passWord && formData.displayName){
            let submit: SignUpData = {
                userName: md5(formData.userName),
                passWord: md5(formData.passWord),
                displayName: formData.displayName
            }

            checkUsername(submit.userName)
                .then(res => {
                    console.log(res)
                    if(!res){
                        axios.post(`${apiSrc}/sign-up/`, { ...submit })
                        .then(res => JSON.parse(res.data))
                        .then((res: string) => {
                            returnUserID(res);
                            redirect.current = true;
                        })
                        .catch(err=>console.error(err))
                    }
                    else{
                        setExists(true);
                    }
                })
                .catch(err=>console.error(err))
        }
    }

    return (
        <div>
            <div style={{color: 'red'}}>{ exists ? 'That username is already in use' : '' }</div>
            <form onSubmit={handleSubmit}>
                <input type='text' 
                    name='displayName' 
                    value={formData.displayName} 
                    onChange={event => handleChange(event, setData, formData, 30)} 
                    placeholder='display name'
                />
                <input type='text' 
                    name='userName' 
                    value={formData.userName} 
                    onChange={event => handleChange(event, setData, formData, 50)} 
                    placeholder='username'
                />
                <input type='text' 
                    name='passWord' 
                    value={formData.passWord} 
                    onChange={event => handleChange(event, setData, formData, 50)} 
                    placeholder='password'
                />
                <button>Sign Up</button>
            </form>
            { redirect.current ? <Redirect to='/'/> : ''}
        </div>
    )
}
