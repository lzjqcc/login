import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {RouteModule} from './route/route.module';
import {SuccessComponent} from './success/success.component';
import {UserService} from './login/login.service';
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

import {ArticleComponent} from "./aritle/article.component";
import {UnlessDirective} from './directive/img.directive';
import {MarkdownEditorComponent} from "./md-editor/md-editor.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule, MatDialogModule, MatDialogRef, MatInputModule, MatSelectModule,
  MatTabsModule, MatIconModule, MAT_PLACEHOLDER_GLOBAL_OPTIONS, MatTooltipModule, MatGridListModule,
MatRadioModule } from "@angular/material";
import {ImageDialog} from "./aritle/image.dialog";
import {TestCompontent} from "./test/test.compontent";
import {MarkdownToHtmlModule} from "ng2-markdown-to-html";
import {ImageUploadModule} from "angular2-image-upload";
import {SubmitDialog} from "./aritle/submit.dialog";
import {ShowarticleComponent} from "./showarticle/showarticle.component";
import {ShowcommentComponent} from "./comment/showcomment.component";
import {RouteHttp} from "./route/route.http";
import {WebSocketService} from "./websocket/WebSocketService";
import {ArticleSertice} from "./aritle/article.sertice";
import { StompService } from 'ng2-stomp-service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SuccessComponent,
    UnlessDirective,
    ArticleComponent,
    MarkdownEditorComponent,
    ImageDialog,
    TestCompontent,
    SubmitDialog,
    ShowarticleComponent,
    ShowcommentComponent
  ],
  imports: [
    BrowserModule,
    RouteModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    MarkdownToHtmlModule.forRoot(),
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    BrowserAnimationsModule,
    ImageUploadModule.forRoot(),
    MatSelectModule,
    MatIconModule, /*图片*/
    MatTooltipModule,
    MatGridListModule,
    MatRadioModule
  ],
  entryComponents: [
    ImageDialog,
    SubmitDialog
  ],
  providers: [StompService, UserService, RouteHttp , WebSocketService, {provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: {float: 'AUTO'}}, ArticleSertice],
  bootstrap: [AppComponent]
})
export class AppModule { }
