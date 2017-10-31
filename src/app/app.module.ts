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
import {ArticleComponent, IFrameDialog} from "./aritle/article.component";
import {UnlessDirective} from './directive/img.directive';
import {MarkdownEditorComponent} from "./md-editor/md-editor.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule, MatDialogRef} from "@angular/material";
import {FullscreenOverlayContainer, OverlayContainer} from "@angular/cdk/overlay";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SuccessComponent,
    UnlessDirective,
    ArticleComponent,
    MarkdownEditorComponent,
    IFrameDialog

  ],
  imports: [
    BrowserModule,
    RouteModule,
    HttpModule,
    FormsModule,
    MarkdownModule.forRoot(),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule
  ],
  entryComponents: [
    IFrameDialog
  ],
  providers: [UserService, {provide: OverlayContainer, useClass: FullscreenOverlayContainer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
