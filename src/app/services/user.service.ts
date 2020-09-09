import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User, Profile, EditProperyUser } from '../models/UserProfile';



@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient, private router: Router) { }


    public register(userProfile: User): Observable<{ message: string }> {
        const userProfileData = this.createUserProfileData(userProfile)
        return this.http.post<{
            message: string
        }>('http://localhost:4455/api/users/register', userProfileData)
    }


    private createUserProfileData(userProfile: User): FormData {
        let userProfileData = new FormData()
        userProfileData.append('email', userProfile.email)
        userProfileData.append('password', userProfile.password)
        userProfileData.append('userName', userProfile.profile.userName)
        userProfileData.append('genus', userProfile.profile.genus)
        userProfileData.append('birthday', userProfile.profile.birthday)
        userProfileData.append('image', userProfile.profile.imagePath)
        return userProfileData
    }


    public getUser(): Observable<{ message: string, user: User }> {
        return this.http.get<{
            message: string,
            user: User
        }>(`http://localhost:4455/api/users/user/profile`)
    }

    public userUpdateProfile(editInfo: EditProperyUser) {

        let infoToEdit: EditProperyUser | FormData
        if (editInfo.value instanceof File) {
            let userProfileData = new FormData()
            userProfileData.append('image', editInfo.value)
            userProfileData.append('propertyname', editInfo.propertyname)
            infoToEdit = userProfileData
        } else {
            infoToEdit = { ...editInfo }
        }


        return this.http.post<{
            message: string
        }>(`http://localhost:4455/api/users/user/update_profile`, infoToEdit)
    }

}
