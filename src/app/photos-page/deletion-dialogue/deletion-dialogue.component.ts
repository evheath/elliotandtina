import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadDataModel } from '../upload.model';

@Component({
  selector: 'app-deletion-dialogue',
  templateUrl: './deletion-dialogue.component.html',
  styleUrls: ['./deletion-dialogue.component.scss']
})
export class DeletionDialogueComponent {


  constructor(
    public dialogRef: MatDialogRef<DeletionDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadDataModel) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}