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
  private rsvpRef: AngularFirestoreDocument<RsvpDataModel>

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) { }


  public async writeRsvp() {
    const user = await this.auth.currentUser;
    this.rsvpRef = this.db.doc<RsvpDataModel>(`rsvp/${user.uid}`)
    this.rsvpData.uid = user.uid
    await this.rsvpRef.set(this.rsvpData, { merge: true })
  }

  ngOnInit() {
    this.rsvpData = {
      uid: "",
      name: "Lance Shmucketelly",
      attendees: 1,
      attending: false,
      comment: "",
    }
  }



}
