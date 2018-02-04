import {Component, ElementRef, Renderer2} from '@angular/core';
import {Router} from "@angular/router";
import {RouteHttp} from "../route/route.http";
import {WebSocketService} from "../websocket/WebSocketService";

@Component({
  selector: 'app-root',
  template: '<p> success </p>'
})
export class SuccessComponent {
  title = 'app';
  constructor( private http: RouteHttp, private  router: Router, private ws : WebSocketService, private render: Renderer2, private el: ElementRef) {
    console.log( this.http.doGet(null, '/friend/get').subscribe(responce => {
      console.log(responce);
      const ws = new WebSocketService();
      ws.receiveMsg();
    }) );
  }

}
