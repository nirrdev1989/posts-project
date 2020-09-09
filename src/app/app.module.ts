import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";


// Angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from "./angular.material.module";


// Modules
import { PostsModule } from './components/posts/posts.module';
// import { PipesModule } from "./services/pipes/pipes.module";



// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/share/header/header.component';
import { ErrorMessageComponent } from './components/share/error-message/error-message.component';
import { FooterComponent } from "./components/share/footer/footer.component";
import { SpinnerComponent } from "./components/share/spinner/spinner.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { CommentsComponent } from './components/posts/comments/comments.component';
import { EditProfileFieldComponent } from "./components/user/edit-profile-field/edit-profile-field.component";


// Interceptors
import { AuthInterceptor } from './services/interceptors/auth.interceptor';
import { ErrorHttpInterceptor } from "./services/interceptors/error.http.interceptor";
import { LoaderInterceptor } from "./services/interceptors/loader.interceptor";


// import { FirstCharToUpperCase } from "./services/pipes/firstcharupper.pipe";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ErrorMessageComponent,
        FooterComponent,
        SpinnerComponent,
        NotFoundComponent,
        // FirstCharToUpperCase
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        PostsModule,
        // PipesModule,
    ],
    exports: [
        AngularMaterialModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHttpInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        ErrorMessageComponent,
        CommentsComponent,
        EditProfileFieldComponent
    ]
})
export class AppModule { }
