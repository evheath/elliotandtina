import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SnackbarService } from '../snackbar.service';
import { UserService } from '../user.service';
import { UploadDataModel } from './upload.model';

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.scss']
})
export class PhotosPageComponent implements OnInit, OnDestroy {


  private subs = new Subscription();
  public isHovering: boolean;
  public files: File[] = [];
  public doingWork: boolean;
  public uploads$: BehaviorSubject<UploadDataModel[]> = new BehaviorSubject([]);


  constructor(
    public storage: AngularFireStorage,
    public db: AngularFirestore,
    // private auth: AngularFireAuth,
    public user: UserService,
    private snack: SnackbarService
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

  public async startUpload() {
    this.doingWork = true;

    this.files.forEach(file => {
      // The storage path
      const timestamp = Date.now()
      const path = `uploads/${timestamp}_${file.name}`;

      // Reference to storage bucket
      const ref = this.storage.ref(path);



      // The main task
      this.storage.upload(path, file).then(async () => {
        const downloadURL = await ref.getDownloadURL().toPromise();

        let newUpload: UploadDataModel = {
          path,
          downloadURL,
          likers: [],
          uid: this.user.uid,
          name: this.user.name,
          timestamp,
        }
        await this.db.doc<UploadDataModel>(path).set(newUpload)
      });

    });

    // clear the files array
    this.files.splice(0);
    this.doingWork = false;
  }


  public isOwner(upload: UploadDataModel) {
    return upload.uid === this.user.uid
  }

  public async deleteUpload(upload: UploadDataModel) {
    try {
      // the deletion of the actual image happens via firebase functions
      await this.db.doc(upload.path).delete()
      this.snack.simple("Upload deleted")
    } catch (e) {
      console.error(e)
      this.snack.simple("Problem deleting upload")
    }
  }



  ngOnInit(): void {
    this.doingWork = false;

    // get the uploads
    this.subs.add(this.db.collection<UploadDataModel>("uploads").valueChanges()
      .subscribe(docs => {
        this.uploads$.next(docs)
      })
    )

  }
  ngOnDestroy() {
    this.subs.unsubscribe();

    // use for dates
    // qualifiedDate = new DatePipe("en-US").transform(qualifiedDate.toDate(), "dd-MMM-yyyy");
  }
}
