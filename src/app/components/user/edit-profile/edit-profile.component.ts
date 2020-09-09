import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User, EditProperyUser } from 'src/app/models/UserProfile';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

    @Input() user: User
    @Output() editData: EventEmitter<EditProperyUser> = new EventEmitter<EditProperyUser>()

    constructor() { }

    ngOnInit(): void { }


    editProfileItem(data: EditProperyUser) {
        this.editData.emit(data)
    }

    deleteAccount() {
        alert('אחי חאלס לא עובד עדיין')
    }
}
