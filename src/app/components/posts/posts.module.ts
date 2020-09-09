import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "../../angular.material.module";


import { CreatePostComponent } from './create-post/create-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostItemComponent } from './post-item/post-item.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentItemComponent } from "./comment-item/comment-item.component";





@NgModule({
    declarations: [
        CreatePostComponent,
        PostListComponent,
        CommentsComponent,
        PostItemComponent,
        CommentItemComponent
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        RouterModule
    ]
})

export class PostsModule { }