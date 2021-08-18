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
  public rsvp$: Observable<RsvpDataModel>

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    // if the user is authenticated we make the rsvp doc available
    // as well as track some individual fields
    this.rsvp$ = this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.uid = user.uid;
          return this.db.doc<RsvpDataModel>(`rsvp/${user.uid}`).valueChanges()
            .pipe(
              tap(rsvp => {
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
