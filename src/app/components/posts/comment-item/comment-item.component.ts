import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Comment } from 'src/app/models/Post';




@Component({
    selector: 'app-comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements AfterViewInit {

    @ViewChild('item') commentItemElement: ElementRef

    @Input() comment: Comment
    @Input() userId: string
    @Input() isAuth: boolean
    @Output() commentId: EventEmitter<string> = new EventEmitter<string>()


    ngAfterViewInit(): void {
        this.commentItemElement.nativeElement.scrollIntoView()
    }

    deleteComment(commentId: string): void {
        this.commentId.emit(commentId)
    }

}
