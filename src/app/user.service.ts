import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { RsvpDataModel } from './rsvp-page/rsvp.model';

import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public name: string;
  public uid: string;
  public $isApproved: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public $isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    // determine if user is approved to upload pictures
    this.auth.authState.subscribe(user => {
      if (user) {
        this.uid = user.uid
        this.$isAuthenticated.next(true)

        const rsvpRef = this.db.doc<RsvpDataModel>(`rsvp/${user.uid}`)
        rsvpRef.valueChanges().subscribe(rsvp => {
          this.$isApproved.next(rsvp.approved)
          this.name = rsvp.name
        });
      }
    });
  }


}
