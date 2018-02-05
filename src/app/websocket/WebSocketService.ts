import {Injectable} from "@angular/core";
import {StompService} from 'ng2-stomp-service';
import {baseURL} from '../url.constont';
import {Friend} from "../login/user";

// https://www.npmjs.com/package/ng2-stomp-service
@Injectable()
export class WebSocketService {
  private subscription: any;
  constructor(public stomp: StompService) {
    stomp.configure({host: baseURL + '/endpointWisely', debug: true, queue: {'init': false}});
    stomp.startConnect().then(() => {
      stomp.done('init');
      console.log('connected');
 /*     this.subscription = stomp.subscribe('/topic/top', (message, heads) => {
        console.log('websocket');
        console.log(message);
      });*/
    });
  }

  subscriptionFriendSignin(list: Array<Friend>): void {

    console.log("subscriptionn");
    console.log(list);
    list.forEach(((value, index, array) => {
      console.log('dfdfdf' + value)
      this.stomp.after('init').then(()=>{
        this.stomp.subscribe('/topic/friend/signin/' + value.friendId,(data)=>{

        });
      });
    }));
  }


  receiveMsg(): void {
  }

}
