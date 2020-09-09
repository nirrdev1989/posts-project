import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../../models/Post';
import { PostService } from 'src/app/services/post.service';
import { Subscription } from "rxjs";
import { AuthService } from 'src/app/services/auth.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommentsComponent } from '../comments/comments.component';


@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

    public posts: Post[]
    public lengthOfPosts: number = 0
    public pageSizePosts: number = 5
    public currentPage: number = 1
    public pageSizeOptionsPosts: number[] = [1, 2, 3, 5, 10]
    public isAuth: boolean = false
    public userId: string

    private postsSub: Subscription



    constructor(
        private postService: PostService,
        private authService: AuthService,
        private dialog: MatDialog) {
        this.posts = []
    }


    ngOnInit(): void {
        this.postService.getPosts(this.pageSizePosts, this.currentPage).subscribe()

        this.userId = this.authService.getUserId()
        this.isAuth = this.authService.getIsAuth()

        this.postsSub = this.postService.getPostsChange()
            .subscribe((result) => {
                this.lengthOfPosts = result.maxCount
                this.posts = result.posts
            })
    }

    onDeletePost(postId: string): void {
        this.postService.deletePost(postId).subscribe(
            (result) => {
                this.postService.getPosts(this.pageSizePosts, this.currentPage).subscribe()
            })
    }


    onChangePage(event: PageEvent): void {
        this.currentPage = event.pageIndex + 1
        this.pageSizePosts = event.pageSize
        this.postService.getPosts(this.pageSizePosts, this.currentPage).subscribe()
    }


    onOpenComments(postId: string): void {
        const dialogConfig = new MatDialogConfig()
        dialogConfig.disableClose = true
        dialogConfig.autoFocus = true

        dialogConfig.data = {
            postId: postId,
        }

        this.dialog.open(CommentsComponent, dialogConfig)

    }


    ngOnDestroy(): void {
        this.postsSub.unsubscribe()
    }


}
