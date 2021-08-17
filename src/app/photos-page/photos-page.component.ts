import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RsvpDataModel } from '../rsvp-page/rsvp.model';
import { UploadDataModel } from './upload.model';

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.scss']
})
export class PhotosPageComponent implements OnInit, OnDestroy {


  subs = new Subscription();
  isHovering: boolean;
  files: File[] = [];
  doingWork: boolean;
  public $userIsApproved: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public $uploads: BehaviorSubject<UploadDataModel[]> = new BehaviorSubject([]);


  constructor(
    public storage: AngularFireStorage,
    public db: AngularFirestore,
    private auth: AngularFireAuth,
  ) { }

  // needed for canDeactivate
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.hasUnsavedData()) {
      $event.returnValue = true;
    }
  }
  public hasUnsavedData(): boolean {
    return this.doingWork
  }


  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    // console.log('user dropped file(s)')
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }

    this.startUpload()
  }

  async startUpload() {
    this.doingWork = true;

    this.files.forEach(file => {
      // The storage path
      const path = `uploads/${Date.now()}_${file.name}`;

      // Reference to storage bucket
      const ref = this.storage.ref(path);

      // The main task
      this.storage.upload(path, file).then(async () => {
        const downloadURL = await ref.getDownloadURL().toPromise();

        await this.db.collection('uploads').add({ downloadURL, path });
      });

    });

    // clear the files array
    this.files.splice(0);
    this.doingWork = false;
  }



  ngOnInit(): void {
    this.doingWork = false;

    // determine if user is approved to upload pictures
    this.subs.add(this.auth.authState.subscribe(user => {
      if (user) {
        const rsvpRef = this.db.doc<RsvpDataModel>(`rsvp/${user.uid}`)
        this.subs.add(rsvpRef.snapshotChanges().subscribe(rsvp => {
          this.$userIsApproved.next(rsvp.payload.data().approved)
        }));
      }
    }));

    // get the uploads
    this.subs.add(this.db.collection<UploadDataModel>("uploads").valueChanges().subscribe(docs => {
      this.$uploads.next(docs)
    })
    )

  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
