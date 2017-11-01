import {Component} from "@angular/core";
import {MatDialogConfig, MatDialogRef} from "@angular/material";
const defaultDialogConfig = new MatDialogConfig();
export  const config = {
  disableClose: false,
  panelClass: 'custom-overlay-pane-class',
  hasBackdrop: true,
  backdropClass: '',
  width: '',
  height: '',
  minWidth: '',
  minHeight: '',
  maxHeight: '',
  position: {
    top: '',
    bottom: '',
    left: '',
    right: ''
  },
  data: {
    message: 'Jazzy jazz jazz'
  }
};
@Component({
  selector: 'demo-iframe-dialog',
  styles: [
      `iframe {
      width: 800px;
    }`
  ],
  templateUrl: 'image.dialog.html'
})
export class IFrameDialog {
  imageUploaded(event: any){
    console.log(event);
  }
  imageRemoved(event: any){
    console.log(event);
  }
  disableSendButton(event: any){
    console.log(event);
  }
}

