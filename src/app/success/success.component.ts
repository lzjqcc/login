import {Component, ElementRef, Renderer2} from '@angular/core';
import {Router} from "@angular/router";
import {RouteHttp} from "../route/route.http";
import {WebSocketService} from "../websocket/WebSocketService";
import {Friend} from "../login/user";

@Component({
  selector: 'app-root',
  template: '<p> success </p>'
})
export class SuccessComponent {
  title = 'app';
  constructor( private http: RouteHttp, private  router: Router, private ws : WebSocketService, private render: Renderer2, private el: ElementRef) {
     this.http.doGet(null, '/friend/get').subscribe(responce => {
     // const ws = new WebSocketService();
     /* var friends = new Array<Friend>();
      for (var a of responce.result) {
        var friend = new Friend();
        friend.currentAccountId = a.currentAccountId;
        friend.friendName = a.friendName;
        friend.id = a.id;
        friend.friendId = a.friendId;
        friends.push(friend);
      }*/
       ws.subscriptionFriendSignin(responce.result.id);
    });
  }

}
