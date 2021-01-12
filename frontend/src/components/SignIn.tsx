import React, { useState } from 'react'
import { defaultIcon, Login } from '../defintions'

interface Props{
    returnUserID: (id: string) => void 
}

export default function SignIn({ returnUserID }: Props) {
    const [login, setLogin] = useState<Login>({userName: '', passWord: ''});
    const [failed, setFailed] = useState<boolean>(false);

    function hasKey<O>(obj: O, key: string | number | symbol): key is keyof O{
        return key in obj
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        let { value, name } = event.target;
        if(value.length < 100 && hasKey(login, name)){
            setLogin({...login, [name]: value});
        }
    }

    function checkLogin(login: Login): string | null{
        return (login.userName === 'Dehan' && login.passWord === '123') ? '1' : null
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        let user = checkLogin(login);

        if(user){
            returnUserID(user);
        }
        else{
            setFailed(true);
        }
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
