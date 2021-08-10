import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-rsvp-page',
  templateUrl: './rsvp-page.component.html',
  styleUrls: ['./rsvp-page.component.scss']
})
export class RsvpPageComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

}
