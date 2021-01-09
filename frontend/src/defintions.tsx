export interface TL_Post{
    text: string,
    userID: string,
    hasImg: boolean,
    imgs?: string[]
}

export interface User{
    userID: string,
    userName: string,
    icon: string
}

export const defaultIcon = "https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
export const defaultUser = {userID: '-1', userName:'unknown', icon: defaultIcon}