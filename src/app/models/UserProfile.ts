export interface User {
    email: string
    password: string
    profile: Profile
}

export interface Profile {
    userName: string
    genus: string
    birthday: string
    imagePath: string | File
}

export interface UserInfo {
    email: string,
    imagePath: string,
}

export interface EditProperyUser {
    propertyname: string
    value: any
}

