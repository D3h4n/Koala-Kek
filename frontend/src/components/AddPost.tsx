import React, { useState } from 'react'
import { TL_Post, User } from '../defintions'

interface Props{
    getUser: () => User;
}

export default function AddPost({ getUser }: Props){
    const [isVisible, setVisible] = useState<boolean>(false);
    const [formData, setFormData] = useState<TL_Post>({text: '', userID: '', hasImg: false, imgs: []});

    function hasKey<O>(obj: O, key: string | number | symbol): key is keyof O{
        return key in obj
    }

    function handleChange(event: React.ChangeEvent<any>){
        let { value, name } = event.target;
        if(hasKey(formData, name)){
            setFormData({...formData, [name]: value, userID: getUser().userID});
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
        setFormData({text: '', userID: getUser().userID, hasImg: false, imgs: []})
    }

    function handleCancel(){
        handleClear();
        setVisible(false);
    }

    return (<>
        <div className='add-post-background' style={{opacity: (isVisible ? '0.6' : '0')}}></div>
        <div className='add-post'>
            <button className='add-post-btn' onClick={()=>setVisible(true)} style={{display: (isVisible? 'none' : 'block')}}>+</button>
            
            <div className='add-post-form' style={{display: (isVisible? 'block' : 'none')}}>
                <form onSubmit={handleSubmit}>
                    <textarea value={formData.text} onChange={handleChange} name='text' className='add-post-form-text-input' placeholder='Enter text'/>
                    <button className='add-post-form-btn post-btn' type='submit'>Post</button>
                    <button className='add-post-form-btn cancel-btn' onClick={handleCancel}>Cancel</button>
                    <button className='add-post-form-btn add-image-btn'>Add Image</button>
                </form>
            </div>
        </div>
    </>)
}


