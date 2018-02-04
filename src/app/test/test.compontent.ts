import { Component } from '@angular/core';
import {MatDialog} from "@angular/material";
import {ImageDialog} from "../aritle/image.dialog";

@Component({
  selector: 'dialog',
  template: ' <image-upload (onRemove)="imageRemoved($event)" (imageUploaded)="imageUploaded($event)"></image-upload>',
})
export class TestCompontent {
  imageRemoved(event: any) {
    console.log(event);
  }
  imageUploaded(event: any) {
    console.log(event);
  }
  disableSendButton(event: any){
    console.log(event);
  }
}
