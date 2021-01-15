import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

import { handleChange } from './App'
import { defaultIcon, Login } from '../defintions'

interface Props{
    returnUserID: (id: string) => void 
}

export default function SignIn({ returnUserID }: Props) {
    const [login, setLogin] = useState<Login>({userName: '', passWord: ''});
    const [failed, setFailed] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<boolean>(false);

    const textLimit = 50;

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        axios.get(`http://localhost:5050/api/user/login=${encodeURIComponent(JSON.stringify(login))}`)
            .then(res => JSON.parse(res.data))
            .then(res => {
                if(res){
                    returnUserID(res);
                }
                else{
                    setFailed(true);
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='sign-in-container'>
            <h1 className='sign-in-header'>Sign In</h1>

            <img className='sign-in-img' src={defaultIcon} alt='defaultIcon'/>

            <p className='sign-in-failed' style={{display: failed ? 'block' : 'none'}}>Login Failed</p>

            <form onSubmit={handleSubmit} className='sign-in-form'>
                    <input className='sign-in-form-username' type='text' name='userName' value={login?.userName} onChange={(event)=>handleChange(event, setLogin, login, textLimit)} placeholder='Username'/>
                    <input className='sign-in-form-password' type='text' name='passWord' value={login?.passWord} onChange={(event)=>handleChange(event, setLogin, login, textLimit)} placeholder='Password'/>
                    <div className='sign-in-form-btn-container'>
                        <button className='sign-in-form-btn' type='submit'>Login</button>
                        <button className='sign-in-form-btn' type='button' onClick={() => setRedirect(true)}>Sign Up</button>
                    </div>
            </form>
            {redirect ? <Redirect to='/SignUp'/> : ''}
        </div>
    )
}
