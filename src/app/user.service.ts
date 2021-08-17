import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { RsvpDataModel } from './rsvp-page/rsvp.model';

import { BehaviorSubject, Observable, of } from 'rxjs'
import { shareReplay, switchMap, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public name: string;
  public uid: string;
  public isApproved$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public rsvp$: Observable<RsvpDataModel>

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    this.rsvp$ = this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.uid = user.uid;
          // this.userRef = this.afs.doc<User>(`users/${user.uid}`)
          return this.db.doc<RsvpDataModel>(`rsvp/${user.uid}`).valueChanges()
            .pipe(
              tap(rsvp => {
                this.isApproved$.next(rsvp.approved);
                this.name = rsvp.name;
              }),
              shareReplay(),
            )
        } else {
          return of(null);
        }
      })
    );
  }


}
