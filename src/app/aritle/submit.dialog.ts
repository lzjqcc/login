import { Component,Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './submit.dialog.html',
})
export class SubmitDialog {
  states = [{code: 'AL', name: 'Alabama'}];
  @Input()
  fruits = [
    { name: 'Lemon' },
    { name: 'Lime' },
    { name: 'Apple' },
  ]
  constructor(public dialogRef: MatDialogRef<SubmitDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
  }
}
