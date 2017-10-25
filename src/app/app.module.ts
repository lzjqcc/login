import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {RouteModule} from './route/route.module';
import {AlertComponent} from './alter/alert.component';
import {SuccessComponent} from './success/success.component';
import {AlertService} from './alter/alert.service';
import {UserService} from './login/login.service';
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    RouteModule,
    HttpModule,
    FormsModule
  ],
  providers: [AlertService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
