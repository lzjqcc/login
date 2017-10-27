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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SuccessComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    RouteModule,
    HttpModule,
    FormsModule,
    MarkdownModule.forRoot(),
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
