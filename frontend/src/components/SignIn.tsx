import React, { useState } from 'react'
import { Login } from '../defintions'

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
        <div>
            <p style={{display: failed ? 'block' : 'none'}}>Login Failed</p>
            <form onSubmit={handleSubmit}>
                <input type='text' name='userName' value={login?.userName} onChange={handleChange} placeholder='username'/>
                <input type='text' name='passWord' value={login?.passWord} onChange={handleChange} placeholder='password'/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}
