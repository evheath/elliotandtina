import { Injectable } from '@angular/core';
import {
  CanDeactivate
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UnsavedGuard implements CanDeactivate<any> {
  canDeactivate(component: any): boolean {

    if (component.hasUnsavedData()) {
      if (confirm("You have unsaved changes! If you leave, your changes will be lost.")) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
