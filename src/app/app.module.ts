import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { LodgingPageComponent } from './lodging-page/lodging-page.component';
import { VenuePageComponent } from './venue-page/venue-page.component';

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { IvyCarouselModule } from 'angular-responsive-carousel';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { GoogleSigninDirective } from './google-signin.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ReactiveFormsModule } from '@angular/forms';
import { EmailLoginComponent } from './email-login/email-login.component';

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'

const firebaseConfig = {
  apiKey: "AIzaSyA05ANqcrmkv-zGgo35y-mGyEwM42UkPlM",
  authDomain: "elliotandtina.firebaseapp.com",
  projectId: "elliotandtina",
  storageBucket: "elliotandtina.appspot.com",
  messagingSenderId: "1090811861387",
  appId: "1:1090811861387:web:e00d750cacf1002d7fb78e"
};

@NgModule({
  declarations: [
    AppComponent,
    FaqPageComponent,
    LodgingPageComponent,
    VenuePageComponent,
    AuthPageComponent,
    GoogleSigninDirective,
    EmailLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    IvyCarouselModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
