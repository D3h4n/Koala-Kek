import React, { useState } from 'react'
import axios from 'axios'

import { TL_Post, User } from '../defintions'
import { apiSrc } from './App'

interface Props{
    user: User
    handlePost: (post:TL_Post) => void
}

const time = new Date()

export default function AddPost({ user, handlePost }: Props){
    const [isVisible, setVisible] = useState<boolean>(false);
    const [formData, setFormData] = useState<TL_Post>({text: '', userID: '', hasImg: false, imgs: []});
    const textLimit = 200;
    const lineLimit = 7;


    function hasKey<O>(obj: O, key: string | number | symbol): key is keyof O{
        return key in obj
    }

    function handleChange(event: React.ChangeEvent<any>){
        let { value, name } = event.target;
        if(hasKey(formData, name) && value.split(/\r\n|\r|\n/).length <= lineLimit){
            setFormData({ ...formData, [name]: value.slice(0, Math.min(textLimit, value.length)), userID: user.userID });
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
    
        if(formData.text || formData.hasImg){
            axios.post(`${apiSrc}/posts/post=${encodeURIComponent(JSON.stringify(formData))}`)
                .then(res => res.data === 'success' ? handlePost(formData) : undefined)
                .catch(err => console.error(err));

            setVisible(false);
            handleClear();
        }
    }

    function handleClear(){
        setFormData({timestamp: time, text: '', userID: user.userID, hasImg: false, imgs: []})
    }

    function handleCancel(){
        handleClear();
        setVisible(false);
    }

    return (<>
        <div className='add-post-background' style={{display: (isVisible ? 'block' : 'none')}}></div>
        <div className='add-post'>
            <button className='add-post-btn' onClick={()=>setVisible(true)} style={{display: (isVisible? 'none' : 'block')}}>+</button>
            
            <div className='add-post-form' style={{display: (isVisible? 'block' : 'none')}}>
                <form onSubmit={handleSubmit}>
                    <button className='add-post-form-btn post-btn' type='submit'>Post</button>
                    <button className='add-post-form-btn cancel-btn' onClick={handleCancel}>Cancel</button>
                    <textarea value={formData.text} onChange={handleChange} name='text' className='add-post-form-text-input' placeholder='Enter text'/>
                    <button className='add-post-form-btn add-image-btn'>Add Image</button>
                </form>
                <hr className='add-post-form-hr'/>
                <p className='add-post-form-count'>{formData.text.length}/{textLimit}</p>
            </div>
        </div>
    </>)
}


