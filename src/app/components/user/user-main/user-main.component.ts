import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User, EditProperyUser } from 'src/app/models/UserProfile';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditProfileFieldComponent } from '../edit-profile-field/edit-profile-field.component';


@Component({
    selector: 'app-user-main',
    templateUrl: './user-main.component.html',
    styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

    public user: User

    constructor(
        private userService: UserService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.userService.getUser()
            .subscribe((result) => {
                this.user = result.user
            })
    }


    onOpenEditProfile(data: EditProperyUser) {
        const { propertyname, value } = data

        const dialogConfig = new MatDialogConfig()
        dialogConfig.disableClose = true

        dialogConfig.data = {
            propertyname: propertyname,
            value: value
        }

        this.dialog.open(EditProfileFieldComponent, dialogConfig)

    }


}

