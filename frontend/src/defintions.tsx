export interface TL_Post{
    [index: string]: any
    timestamp?: Date
    text: string
    userID: string
    hasImg: boolean
    imgs?: string[]
}

export interface User{
    userID: string
    userName: string
    icon: string
}

export interface Login{
    [index: string]: string
    userName: string
    passWord: string
}

export const defaultIcon = "https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
export const defaultUser = {userID: '-1', userName: 'User not found', icon: defaultIcon }