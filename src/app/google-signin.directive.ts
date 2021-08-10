import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { SnackbarService } from './snackbar.service';

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {
  constructor(private afAuth: AngularFireAuth, private snack: SnackbarService) { }

  @HostListener('click')
  onclick() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
      this.snack.simple("Login successful!")
    }).catch(err => {
      this.snack.simple("Could not sign in")
    });
  }
}
