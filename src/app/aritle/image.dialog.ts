import {Component, ElementRef, Renderer2} from "@angular/core";
import {MatDialogConfig, MatDialogRef} from "@angular/material";
import {ArticleSertice} from "./article.sertice";
import {FileHolder} from "_angular2-image-upload@1.0.0-rc.0@angular2-image-upload";

const defaultDialogConfig = new MatDialogConfig();
@Component({
  selector: 'demo-iframe-dialog',
  styles: [
      `iframe {
      width: 800px;
    }`
  ],
  templateUrl: 'image.dialog.html'
})
export class ImageDialog {
  myHeaders: { [name: string]: any } = {
    'withCredentials': 'true',
  };
  imageURL: string;
  rightPre: any;
  constructor(private articleService: ArticleSertice, private el: ElementRef, private renderer: Renderer2 ) {

  }
  onClick(type: string) {
    this.articleService.insertContent(this.articleService.getEditor(), type , this.imageURL);
    this.rightPre = this.articleService.getRightPre();
  }

  onRemoved(event: any) {
    console.log(event);
  }
  disableSendButton(event: any){
    console.log(event);
  }
  onUploadFinished(event: FileHolder) {
    console.log(event.serverResponse['_body'].picURL);
    const json = JSON.parse(event.serverResponse['_body']);
    console.log(json.picURL);
    this.articleService.insertContent(this.articleService.getEditor(), 'Image' , json.picURL);
  }
}

