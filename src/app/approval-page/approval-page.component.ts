import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RsvpDataModel } from '../rsvp-page/rsvp.model';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-approval-page',
  templateUrl: './approval-page.component.html',
  styleUrls: ['./approval-page.component.scss']
})
export class ApprovalPageComponent implements OnInit {
  rsvps$: Observable<RsvpDataModel[]>;
  aggregation$: Observable<any>;

  constructor(
    public db: AngularFirestore,
    private snack: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.rsvps$ = this.db.collection<RsvpDataModel>("rsvp").valueChanges();

    this.aggregation$ = this.db.doc("aggregations/rsvp").valueChanges();
  }

  public approveUser(rsvp: RsvpDataModel) {
    // console.log(`Approving ${rsvp.name} ${rsvp.uid}`);

    const rsvpRef = this.db.doc<RsvpDataModel>(`rsvp/${rsvp.uid}`)

    rsvpRef.update({
      'approved': true,
    }).then(success => {
      this.snack.simple(`${rsvp.name} approved`);
    }).catch(e => {
      this.snack.simple(`Problem approving ${rsvp.name}`);
      console.error(e)
    });

  }
  public unApproveUser(rsvp: RsvpDataModel) {
    // console.log(`Unapproving ${rsvp.name}`);


    const rsvpRef = this.db.doc<RsvpDataModel>(`rsvp/${rsvp.uid}`)

    rsvpRef.update({
      'approved': false,
    }).then(success => {
      this.snack.simple(`Unapproved ${rsvp.name}`);
    }).catch(e => {
      this.snack.simple(`Problem unapproving ${rsvp.name}`);
      console.error(e)
    });
  }

}
