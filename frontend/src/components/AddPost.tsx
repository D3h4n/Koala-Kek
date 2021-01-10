import React, { useState } from 'react'
import { TL_Post, User } from '../defintions'

interface Props{
    user: User
}

export default function AddPost({ user }: Props){
    const [isVisible, setVisible] = useState<boolean>(false);
    const [formData, setFormData] = useState<TL_Post>({text: '', userID: '', hasImg: false, imgs: []});
    const textLimit = 200;


    function hasKey<O>(obj: O, key: string | number | symbol): key is keyof O{
        return key in obj
    }

    function handleChange(event: React.ChangeEvent<any>){
        let { value, name } = event.target;
        if((formData.text.length < textLimit || value.length < formData.text.length) && hasKey(formData, name)){
            setFormData({...formData, [name]: value.slice(0, Math.min(200, value.length)), userID: user.userID});
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        if(formData.text){
            console.log(formData);
            setVisible(false);
            handleClear();
        }
    }

    function handleClear(){
        setFormData({text: '', userID: user.userID, hasImg: false, imgs: []})
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


