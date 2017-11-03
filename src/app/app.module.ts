import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {RouteModule} from './route/route.module';
import {SuccessComponent} from './success/success.component';
import {UserService} from './login/login.service';
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {MarkdownModule} from "angular2-markdown";
import {ArticleComponent} from "./aritle/article.component";
import {UnlessDirective} from './directive/img.directive';
import {MarkdownEditorComponent} from "./md-editor/md-editor.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule, MatDialogModule, MatDialogRef, MatInputModule, MatSelectModule,
  MatTabsModule,
  MatChipsModule, MatIconModule, MAT_PLACEHOLDER_GLOBAL_OPTIONS, MatTooltipModule, MatGridListModule,
} from "@angular/material";
import {FullscreenOverlayContainer, OverlayContainer} from "@angular/cdk/overlay";
import {IFrameDialog} from "./aritle/image.dialog";
import {TestCompontent} from "./test/test.compontent";
import {MarkdownToHtmlModule} from "ng2-markdown-to-html";
import {ImageUploadModule} from "angular2-image-upload";
import {SubmitDialog} from "./aritle/submit.dialog";
import {ChipsComponent} from "./aritle/chips.component";
import {ShowarticleComponent} from "./showarticle/showarticle.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SuccessComponent,
    UnlessDirective,
    ArticleComponent,
    MarkdownEditorComponent,
    IFrameDialog,
    TestCompontent,
    SubmitDialog,
    ChipsComponent,
    ShowarticleComponent
  ],
  imports: [
    BrowserModule,
    RouteModule,
    HttpModule,
    FormsModule,
    MarkdownModule.forRoot(),
    NgbModule.forRoot(),
    MarkdownToHtmlModule.forRoot(),
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    BrowserAnimationsModule,
    ImageUploadModule.forRoot(),
    MatSelectModule,
    MatChipsModule, /*标签*/
    MatIconModule, /*图片*/
    MatTooltipModule,
    MatGridListModule
  ],
  entryComponents: [
    IFrameDialog,
    SubmitDialog
  ],
  providers: [UserService, {provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: {float: 'AUTO'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
