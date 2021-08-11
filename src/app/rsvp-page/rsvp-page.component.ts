import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackbarService } from '../snackbar.service';
import { RsvpDataModel } from './rsvp.model';


@Component({
  selector: 'app-rsvp-page',
  templateUrl: './rsvp-page.component.html',
  styleUrls: ['./rsvp-page.component.scss']
})
export class RsvpPageComponent implements OnInit {
  // public rsvpData: RsvpDataModel;
  public rsvpForm: FormGroup;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private snack: SnackbarService, private fb: FormBuilder) { }

  // @ViewChild('inputName') inputName;
  // @ViewChild('inputAttending') inputAttending;
  // @ViewChild('inputAttendees') inputAttendees;
  // @ViewChild('inputComment') inputComment;

  // need for canDeactivate
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.hasUnsavedData()) {
      $event.returnValue = true;
    }
  }

  public hasUnsavedData(): boolean {
    return this.rsvpForm.dirty
    // return this.inputName.dirty
    //   || this.inputAttending.dirty
    //   || (this.rsvpData.attending && this.inputAttendees.dirty)
    //   || this.inputComment.dirty
  }

  // private markFormPristine() {
  //   this.inputName.control.markAsPristine()
  //   this.inputAttending.control.markAsPristine()
  //   if (this.rsvpData.attending) {
  //     // if statement needed since attendees is rendered conditionally
  //     this.inputAttendees.control.markAsPristine()
  //   }
  //   this.inputComment.control.markAsPristine()
  // }

  public async writeRsvp() {
    // if (this.rsvpData.attendees < 0) {
    //   this.snack.simple("No negative numbers haha");
    //   this.rsvpData.attendees = 1
    //   return;
    // }
    // if (this.rsvpData.attendees > 12) {
    //   this.snack.simple("Keep it under 12 please");
    //   this.rsvpData.attendees = 1
    //   return;
    // }
    const user = await this.auth.currentUser;
    const rsvpRef = this.db.doc<RsvpDataModel>(`rsvp/${user.uid}`)

    rsvpRef.update({
      ...this.rsvpForm.value,
      'uid': user.uid,
    }).then(success => {
      this.snack.simple("RSVP updated");
      this.rsvpForm.markAsPristine()
    }).catch(e => {
      this.snack.simple("Problem updating RSVP");
      console.error(e)
    })

    // this.rsvpData.uid = user.uid
    // this.rsvpData.email = user.email
    // this.rsvpData.phoneNumber = user.phoneNumber
    // await rsvpRef.set(this.rsvpData, { merge: true }).then(success => {
    //   this.snack.simple("RSVP updated");
    //   this.markFormPristine();
    // }).catch(e => {
    //   this.snack.simple("Problem updating RSVP");
    //   console.error(e)
    // })

  }

  private getExistingRsvp() {
    this.auth.currentUser.then(user => {
      const rsvpDoc = this.db.doc<RsvpDataModel>(`rsvp/${user.uid}`)
      rsvpDoc.get().toPromise().then(snap => {
        // this.rsvpData = snap.data()
        this.rsvpForm.patchValue(snap.data())
      })
    })
  }

  private buildForm() {
    this.rsvpForm = this.fb.group({
      uid: "",
      name: "Lance Shmucketelly",
      attendees: 1,
      attending: false,
      comment: "",
    })
  }

  ngOnInit() {
    // this.rsvpData = {
    //   uid: "",
    //   name: "Lance Shmucketelly",
    //   attendees: 1,
    //   attending: false,
    //   comment: "",
    // }

    this.buildForm();

    this.getExistingRsvp()
  }



}
