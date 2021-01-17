export interface TL_Post{
    [index: string]: any
    postID?: string
    timestamp?: Date
    text: string
    userID: string
    hasImg: boolean
    imgs?: string[]
}

export interface User{
    userID: string
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

export const defaultIcon = "https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
export const defaultUser = {userID: '-1', userName: '', displayName: 'User not found', icon: defaultIcon }
export const apiSrc = 'http://localhost:5050/api';
export const loginKey = 'user-id';