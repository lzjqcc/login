import { Component } from '@angular/core';
import {MatDialog} from "@angular/material";
import {IFrameDialog} from "../aritle/alter.dialog";

@Component({
  selector: 'dialog',
  template: '<li (click)="this.conClick()">button</li>',
})
export class TestCompontent {
  constructor(public  dialog: MatDialog){}
  conClick(){
    this.dialog.open(IFrameDialog);
  }
}
