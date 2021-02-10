export interface TL_Post{
    [index: string]: any
    id?: string
    timestamp?: Date
    body: string
    userID: string
    hasImg: boolean
    imgs?: string[]
}

export interface User{
    _id: string
    displayName: string
    userName: string
    icon: string
}

export interface Login{
    [index: string]: string
    userName: string
    passWord: string
}

export interface SignUpData{
    userName: string
    passWord: string
    displayName: string
}

export const defaultIcon = "https://res.cloudinary.com/koala-kek/image/upload/v1611439651/koala_kek/default-user-image_lvfd2w.png";
export const defaultUser = {_id: '-1', userName: '', displayName: 'User Deleted', icon: defaultIcon };