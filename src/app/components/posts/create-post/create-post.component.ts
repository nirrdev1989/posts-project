import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../../models/Post';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { PostService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';
import { mimeType } from "../../../services/forms/mine.type.validator";
import { errorMessage } from "../../../services/forms/error.message";
import { uploadFilePiker } from "../../../services/forms/upload.file";
import { HttpEventsService } from 'src/app/services/http-events.service';



@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit, OnDestroy {

    public postForm: FormGroup
    public mode: string = 'create'
    public postId: string
    public post: Post
    public imagePreview: any

    private subRoute: Subscription

    constructor(
        private postService: PostService,
        private formBuilder: FormBuilder,
        private router: Router,
        private httpEventsService: HttpEventsService,
        public route: ActivatedRoute
    ) { }


    ngOnInit(): void {
        this.postForm = this.formBuilder.group({
            title: [null, [
                Validators.required
            ]],
            text: [null, [
                Validators.required
            ]],
            image: [null, [
                Validators.required
            ], [mimeType]]
        })


        this.subRoute = this.route.paramMap.subscribe((result: ParamMap) => {
            if (result.has('id')) {
                this.mode = 'edit'
                this.postId = result.get('id')
                this.postService.getSinglePost(this.postId).subscribe((result) => {
                    this.post = { ...result }
                    this.postForm.patchValue({
                        title: this.post.title,
                        text: this.post.text,
                        image: this.post.imagePath
                    })
                    this.imagePreview = result.imagePath
                })
            } else {
                this.mode = 'create'
                this.postId = null
            }
        })

    }


    onImagePicker(event: any): void {
        const { file, reader } = uploadFilePiker(event)

        this.postForm.patchValue({
            image: file
        })

        this.getFormControl('image').updateValueAndValidity()

        reader.onload = () => {
            this.imagePreview = reader.result
        }

        reader.readAsDataURL(file)
    }


    onSavePost() {
        if (this.postForm.invalid) {
            return
        }

        this.httpEventsService.setStatus(true)

        const { title, text, image } = this.postForm.value


        if (this.mode === 'create') {
            this.postService.addPost(title, text, image)
                .subscribe((result) => {
                    this.router.navigate(['/'])
                })
        } else {
            this.postService.updatePost(this.postId, title, text, image)
                .subscribe((result) => {
                    this.router.navigate(['/'])
                })
        }
    }


    getFormControl(controlName: string): FormControl {
        return this.postForm.get(controlName) as FormControl
    }

    getErrorMessage(control: FormControl): string {
        return errorMessage(control)
    }

    ngOnDestroy(): void {
        this.subRoute.unsubscribe()
    }

}
