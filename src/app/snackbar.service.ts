import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }
  public simple(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
    })
  }

}
