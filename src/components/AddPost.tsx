import React, { useState } from 'react'
import axios from 'axios'

import AddImage from './AddImage'

import { TL_Post, User } from '../defintions'
import { handleChange } from './App'

interface Props{
    user: User
    handleNewPost: (post: TL_Post) => void
}

const time = new Date()

export default function AddPost({ user, handleNewPost }: Props){
    const [isVisible, setVisible] = useState<boolean>(false);
    const [formData, setFormData] = useState<TL_Post>({body: '', userID: user._id, hasImg: false, imgs: []});
    const [displayAddImage, setDisplayAddImage] = useState<boolean>(false);
    const textLimit = 200;
    const lineLimit = 8;

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        if(formData.body || formData.hasImg){
            axios.post(`${process.env.REACT_APP_API_URI}/posts/`, { ...formData, userID: user._id })
                .then(res => JSON.parse(res.data))
                .then((data: {createdAt: Date, id: string }) => {
                    let newPost: TL_Post = formData;
                    newPost.timestamp = new Date(data.createdAt);
                    newPost.id = data.id;
                    newPost.userID = user._id;
                    handleNewPost(newPost);
                })
                .catch(err => console.error(err));

            setVisible(false);
            handleClear();
        }
    }

    function handleClear(){
        setFormData({timestamp: time, body: '', userID: user._id, hasImg: false, imgs: []})
    }

    function handleCancel(){
        handleClear();
        setVisible(false);
    }

    function handlePostText(event: React.ChangeEvent<HTMLTextAreaElement>){
        let value = event.target.value;
        if(value.split(/\r|\n|\r\n/).length <= lineLimit){
            handleChange(event, setFormData, formData);
        }
    }

    function handleAddImageCancel(){
        setDisplayAddImage(false);
    }

    function handleImgPost(imgUrl: string){
        console.log(imgUrl);
        setFormData({...formData, hasImg: true, imgs: [...formData.imgs ? formData.imgs : [], imgUrl]})
        setDisplayAddImage(false);
    }

    return (<>
        <div className='add-post-background' style={{display: (isVisible ? 'block' : 'none')}}></div>
        <div className='add-post'>
            <button 
                className='add-post-btn' 
                onClick={()=>setVisible(true)} 
                style={{display: (isVisible? 'none' : 'block')}}
            >+
            </button>
            
            <div className='add-post-form' style={{display: (isVisible? 'block' : 'none')}}>
                <form onSubmit={handleSubmit}>
                    <button 
                        className='add-post-form-btn post-btn' 
                        type='submit'
                    >Post
                    </button>
                    <button 
                        className='add-post-form-btn cancel-btn'
                        type='button' 
                        onClick={handleCancel}
                    >Cancel
                    </button>
                    <textarea
                        className='add-post-form-text-input'
                        name='body' 
                        value={formData.body}
                        maxLength={textLimit} 
                        onChange={handlePostText}
                        placeholder='Enter text'
                    />
                    <button 
                        className='add-post-form-btn add-image-btn'
                        type='button' 
                        onClick={() => setDisplayAddImage(true)}
                    >Add Image
                    </button>
                </form>
                <hr className='add-post-form-hr'/>
                <p className='add-post-form-count'>{formData.body.length}/{textLimit}</p>
            </div>
        </div>
        <div style={{display: (displayAddImage ? 'block' : 'none')}}>
            <AddImage handleAddImageCancel={handleAddImageCancel} handleImgPost={handleImgPost}/>
        </div>
    </>)
}


