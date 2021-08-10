import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RsvpDataModel } from './rsvp.model';


@Component({
  selector: 'app-rsvp-page',
  templateUrl: './rsvp-page.component.html',
  styleUrls: ['./rsvp-page.component.scss']
})
export class RsvpPageComponent implements OnInit {
  public rsvpData: RsvpDataModel;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) { }


  public async writeRsvp() {
    const user = await this.auth.currentUser;
    const rsvpRef = this.db.doc<RsvpDataModel>(`rsvp/${user.uid}`)
    this.rsvpData.uid = user.uid
    this.rsvpData.email = user.email
    this.rsvpData.phoneNumber = user.phoneNumber
    await rsvpRef.set(this.rsvpData, { merge: true })
  }

  private getExistingRsvp() {
    this.auth.currentUser.then(user => {
      const rsvpDoc = this.db.doc<RsvpDataModel>(`rsvp/${user.uid}`)
      rsvpDoc.get().toPromise().then(snap => {
        this.rsvpData = snap.data()
      })
    })
  }

  ngOnInit() {
    this.rsvpData = {
      uid: "",
      name: "Lance Shmucketelly",
      attendees: 1,
      attending: false,
      comment: "",
    }

    this.getExistingRsvp()
  }



}
