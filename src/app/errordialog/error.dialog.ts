import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from  '@angular/material';
import {BsModalRef} from '_ngx-bootstrap@2.0.2@ngx-bootstrap';

@Component({
  selector: 'errorDialog',
  templateUrl: './error.dialog.html'
})
export class ErrorDialog {
  error: any;
  constructor(public bsModalRef: BsModalRef) {
    console.log(this.error);
  }
}
