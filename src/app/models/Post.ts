export interface Post {
    _id: string
    title: string
    text: string
    imagePath: string | File
    creator: string
    comments?: Comment[]
    commentsLength: number
    creatorImagePath: string
    userName: string
    dateCreated: Date | string
}


export interface Comment {
    _id: string
    creator: string
    text: string
    userName: string
    dateCreated: Date | string
    imagePath: string
}

