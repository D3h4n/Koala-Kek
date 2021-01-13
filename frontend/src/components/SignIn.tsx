import React, { useState } from 'react'
import axios from 'axios'

import { defaultIcon, Login } from '../defintions'

interface Props{
    returnUserID: (id: string) => void 
}

export default function SignIn({ returnUserID }: Props) {
    const [login, setLogin] = useState<Login>({userName: '', passWord: ''});
    const [failed, setFailed] = useState<boolean>(false);
    const textLimit = 50;

    function hasKey<O>(obj: O, key: string | number | symbol): key is keyof O{
        return key in obj
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        let { value, name } = event.target;
        if(hasKey(login, name)){
            setLogin({...login, [name]: value.slice(0, Math.min(textLimit, value.length))});
        }
    }


    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        axios.get(`http://localhost:5050/api/user/login${JSON.stringify(login)}`)
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
                    <input className='sign-in-form-username' type='text' name='userName' value={login?.userName} onChange={handleChange} placeholder='Username'/>
                    <input className='sign-in-form-password' type='text' name='passWord' value={login?.passWord} onChange={handleChange} placeholder='Password'/>
                    <div className='sign-in-form-btn-container'>
                        <button className='sign-in-form-btn' type='submit'>Login</button>
                        <button className='sign-in-form-btn' type='button'>Sign Up</button>
                    </div>
            </form>
        </div>
    )
}