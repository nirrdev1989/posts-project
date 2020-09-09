import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { Comment } from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

    public comments: Comment[]
    public postId: string
    public isAuth: boolean
    public userId: string


    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { postId: string },
        private postService: PostService,
        private authService: AuthService) {
        this.comments = []
    }

    ngOnInit(): void {
        this.isAuth = this.authService.getIsAuth()
        this.userId = this.authService.getUserId()
        this.postId = this.data.postId

        this.postService.getSinglePost(this.postId)
            .pipe(
                map((result) => {
                    return this.mapingComments(result.comments)
                })
            )
            .subscribe((result) => {
                console.log(result)
                this.comments = result
            })

    }


    onAddCommentToPost(event: any) {
        const { value } = event.target
        if (value === '') {
            return
        }


        this.postService.addCommentToPost(this.postId, value)
            .subscribe((result) => {
                this.comments.push(this.mapingComments([result.comment])[0])
                event.target.value = ''
            })
    }


    onDeleteComment(commentId: string) {
        this.postService.deleteCommentFromPost(this.postId, commentId)
            .subscribe((result) => {
                this.comments = this.comments.filter((comment) => comment._id !== commentId)
            })
    }


    mapingComments(comments: Comment[]): Comment[] {
        return comments.map((comment) => {
            return {
                _id: comment._id,
                text: comment.text,
                userName: comment.userName,
                creator: comment.creator,
                dateCreated: new Date(comment.dateCreated).toLocaleTimeString() + ' ' + new Date(comment.dateCreated).toLocaleDateString(),
                imagePath: comment.imagePath
            }
        })
    }


}
