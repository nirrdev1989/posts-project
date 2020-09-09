import { Component, Input, Output } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { EventEmitter } from '@angular/core';



@Component({
    selector: 'app-post-item',
    templateUrl: './post-item.component.html',
    styleUrls: ['./post-item.component.css']
})
export class PostItemComponent {

    @Input() post: Post
    @Input() isAuth: boolean
    @Input() userId: string
    @Input() isLike: boolean = false
    @Output() postDeleted: EventEmitter<string> = new EventEmitter<string>()
    @Output() openComments: EventEmitter<string> = new EventEmitter<string>()


    onOpenComments(postId: string): void {
        this.openComments.emit(postId)
    }


    onDeletePost(postId: string): void {
        if (confirm('Are u sure?')) {
            this.postDeleted.emit(postId)
        } else {
            return
        }

    }

}
