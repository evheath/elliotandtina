import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../snackbar.service';
import { UserService } from '../user.service';
import { RsvpDataModel } from './rsvp.model';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-rsvp-page',
  templateUrl: './rsvp-page.component.html',
  styleUrls: ['./rsvp-page.component.scss']
})
export class RsvpPageComponent implements OnInit {
  public rsvpForm: FormGroup;

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private snack: SnackbarService,
    private fb: FormBuilder,
    private user: UserService,
  ) { }

  // needed for canDeactivate
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.hasUnsavedData()) {
      $event.returnValue = true;
    }
  }
  public hasUnsavedData(): boolean {
    return this.rsvpForm.dirty
  }

  // called when form is ready to submit
  public async writeRsvp() {
    if (this.rsvpForm.invalid) {
      this.snack.simple("Invalid input detected");
      this.rsvpForm.controls['name'].markAsDirty();
      return;
    }

    const user = await this.auth.currentUser;
    const rsvpRef = this.db.doc<RsvpDataModel>(`rsvp/${user.uid}`)

    rsvpRef.set({
      ...this.rsvpForm.value,
      'uid': user.uid,
    }, { merge: true }).then(success => {
      this.snack.simple("RSVP updated");
      this.rsvpForm.markAsPristine()
    }).catch(e => {
      this.snack.simple("Problem updating RSVP");
      console.error(e)
    })

  }

  private patchExistingRsvp() {
    this.user.rsvp$.pipe(
      take(1)
    ).toPromise().then(rsvp => {
      this.rsvpForm.patchValue(rsvp)
    }).catch(e => {
      // If the document doesn't exist an error will occur, no big deal
    });

  }

  private buildForm() {
    this.rsvpForm = this.fb.group({
      uid: "",
      name: new FormControl("", [
        Validators.required
      ]),
      attendees: new FormControl(1, [
        Validators.max(12),
        Validators.min(0)
      ]),
      attending: new FormControl(null, [
        Validators.required
      ]),
      comment: "",
    })
  }

  ngOnInit() {

    this.buildForm();

    this.patchExistingRsvp()
  }



}
