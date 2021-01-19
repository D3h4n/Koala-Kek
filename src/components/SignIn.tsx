import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import { handleChange } from './App'
import { defaultIcon, Login, apiSrc } from '../defintions'

const md5 = require('md5')

interface Props{
    returnUserID: (id: string, rememberSignIn: boolean) => void 
}

export default function SignIn({ returnUserID }: Props) {
    const [login, setLogin] = useState<Login>({userName: '', passWord: ''});
    const [failed, setFailed] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);

    let history = useHistory();
    const textLimit = 50;

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        if(login.userName && login.passWord){
            let submit:Login = {
                passWord: md5(login.passWord),
                userName: md5(login.userName)
            }

            axios.post(`${apiSrc}/sign-in/`, { ...submit })
                .then(res => JSON.parse(res.data))
                .then(res => {
                    if(res){
                        returnUserID(res, checked);
                        history.push('/main')
                    }
                    else{
                        setFailed(true);
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='sign-in'>
            <h1 className='sign-in-header'>Sign In</h1>

            <img className='sign-in-img' src={defaultIcon} alt='defaultIcon'/>

            <p className='sign-in-failed' style={{display: failed ? 'block' : 'none'}}>Login Failed</p>

            <form onSubmit={handleSubmit} className='sign-in-form'>
                    <input className='sign-in-form-input' type='text' name='userName' value={login?.userName} onChange={(event)=>handleChange(event, setLogin, login, textLimit)} placeholder='Username'/>
                    <input className='sign-in-form-input' type='text' name='passWord' value={login?.passWord} onChange={(event)=>handleChange(event, setLogin, login, textLimit)} placeholder='Password'/>
                    <div className='sign-in-form-remember'>
                        <label>Remember Me
                        <input className='sign-in-form-checkbox' type='checkbox' name='remainLogged' checked={checked} onChange={()=>setChecked(!checked)}/>
                        </label>
                    </div>
                    <div className='sign-in-form-btn-container'>
                        <button className='sign-in-form-btn' type='submit'>Login</button>
                        <Link to='/sign-up' className='sign-in-sign-up-btn'>SignUp</Link>
                    </div>
            </form>
        </div>
    )
}
