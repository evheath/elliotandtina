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
    VenuePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
