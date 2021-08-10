import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private snack: SnackbarService) { }

  public handleSignout() {
    this.afAuth.signOut()
    this.snack.simple("Signed out")
  }

  ngOnInit(): void {
  }

}
