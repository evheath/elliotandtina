import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { SnackbarService } from '../snackbar.service';
import { RsvpDataModel } from './rsvp.model';


@Component({
  selector: 'app-rsvp-page',
  templateUrl: './rsvp-page.component.html',
  styleUrls: ['./rsvp-page.component.scss']
})
export class RsvpPageComponent implements OnInit {
  public rsvpData: RsvpDataModel;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private snack: SnackbarService) { }


  public async writeRsvp() {
    if (this.rsvpData.attendees < 0) {
      this.snack.simple("No negative numbers haha");
      this.rsvpData.attendees = 1
      return;
    }
    if (this.rsvpData.attendees > 12) {
      this.snack.simple("Keep it under 12 please");
      this.rsvpData.attendees = 1
      return;
    }

    const user = await this.auth.currentUser;
    const rsvpRef = this.db.doc<RsvpDataModel>(`rsvp/${user.uid}`)
    this.rsvpData.uid = user.uid
    this.rsvpData.email = user.email
    this.rsvpData.phoneNumber = user.phoneNumber
    await rsvpRef.set(this.rsvpData, { merge: true })
    this.snack.simple("RSVP updated");

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
