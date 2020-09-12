import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { UserProfileFormComponent } from './user-profile-form/user-profile-form.component';
import { UserMainComponent } from './user-main/user-main.component';
import { AuthGuard } from 'src/app/services/guards/auth-guard';

const routes: Routes = [
    {
        path: 'create/profile/register',
        component: UserProfileFormComponent
    },
    {
        path: 'user-main/profile',
        component: UserMainComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard
    ]
})




export class UserRoutingModule { }