import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Post, Comment } from '../models/Post';
import { Subject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class PostService {

    private posts: Post[]
    private postChanges: Subject<{ posts: Post[], maxCount: number }>
    private post: Post


    constructor(
        private http: HttpClient) {
        this.posts = []
        this.postChanges = new Subject<{ posts: Post[], maxCount: number }>()
        this.post = null
    }


    public getSingleLocalPost(postId: string): Post {
        return this.posts.find((post) => post._id == postId)
    }

    public getSinglePost(postId: string): Observable<Post> {
        return this.http.get<Post>(`http://localhost:4455/api/posts/single_post/${postId}`)
            .pipe(
                tap((result) => {
                    this.post = result
                })
            )
    }


    public getPostsChange(): Observable<{ posts: Post[], maxCount: number }> {
        return this.postChanges.asObservable()
    }


    public getPosts(pageSize: number, currentPage: number) {
        const query = `?pageSize=${pageSize}&currentPage=${currentPage}`

        return this.http.get<{
            message: string,
            posts: Post[],
            maxCount: number
        }>('http://localhost:4455/api/posts/' + query)
            .pipe(
                map((result) => {
                    // console.log(result.posts, 'PROM SERVER')
                    return {
                        posts: result.posts.map((post, index) => {
                            return {
                                _id: post._id,
                                title: post.title,
                                text: post.text,
                                imagePath: post.imagePath,
                                creator: post.creator,
                                userName: post.userName,
                                commentsLength: post.commentsLength,
                                creatorImagePath: post.creatorImagePath,
                                dateCreated: new Date(post.dateCreated).toLocaleTimeString() + ' ' + new Date(post.dateCreated).toLocaleDateString(),
                            }
                        }), maxCount: result.maxCount
                    }
                }),
                tap((result) => {
                    console.log(result)
                    this.posts = result.posts
                    this.postChanges.next({ posts: [...this.posts], maxCount: result.maxCount })
                })
            )

    }


    public addPost(post: Post): Observable<{ message: string }> {
        const newPost: Post = { ...post }

        const postData = new FormData()
        postData.append('title', newPost.title)
        postData.append('text', newPost.text)
        postData.append('image', newPost.imagePath)

        return this.http.post<{
            message: string,
            post: Post
        }>('http://localhost:4455/api/posts/new', postData)
    }


    public deletePost(postId: string): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`http://localhost:4455/api/posts/del/${postId}`)
    }


    public updatePost(post: Post): Observable<{ message: string }> {
        const newPost: Post = { ...post }
        let postData: Post | FormData
        if (newPost.imagePath instanceof File) {
            postData = new FormData()
            postData.append('id', newPost._id)
            postData.append('title', newPost.title)
            postData.append('text', newPost.text)
            postData.append('image', newPost.imagePath)
        } else {
            postData = { ...newPost }
        }

        return this.http.put<{
            message: string
        }>(`http://localhost:4455/api/posts/update/${newPost._id}`, postData)
    }


    public addCommentToPost(postId: string, comment: Comment): Observable<{ message: string, comment: Comment }> {
        return this.http.post<{
            message: string,
            comment: Comment
        }>(`http://localhost:4455/api/posts/add/comment/${postId}`, comment)
            .pipe(
                tap(() => {
                    this.commentsCount(this.post, 'add')
                })
            )
    }

    public deleteCommentFromPost(postId: string, commentId: string): Observable<{ message: string }> {
        return this.http.delete<{
            message: string
        }>(`http://localhost:4455/api/posts/del/comment/${postId}/${commentId}`)
            .pipe(
                tap(() => {
                    this.commentsCount(this.post, 'delete')
                })
            )
    }


    private commentsCount(post: Post, action: string) {
        this.posts.map((p) => {
            if (p._id === post._id) {
                if (action === 'add') {
                    p.commentsLength++
                } else {
                    p.commentsLength--
                }
            }
        })
    }


}
