import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './components/posts/post-list/post-list.component';
import { CreatePostComponent } from './components/posts/create-post/create-post.component';
import { AuthGuard } from './services/guards/auth-guard';
import { NotFoundComponent } from './components/not-found/not-found.component';



const routes: Routes = [
    {
        path: '',
        component: PostListComponent
    },
    {
        path: 'create',
        component: CreatePostComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'edit/:id',
        component: CreatePostComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./components/auth/auth.module').then((m) => m.AuthModule)
    },
    {
        path: 'user',
        loadChildren: () => import('./components/user/user.module').then((m) => m.UserModule)
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
