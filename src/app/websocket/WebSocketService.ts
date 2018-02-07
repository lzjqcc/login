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

  /**
   * 订阅用户登录
   * @param {number} currentId
   */
  subscriptionFriendSignin(currentId: number): void {
    /*  console.log(list.length);
      list.forEach(((value, index, array) => {
        this.stomp.after('init').then(()=>{
          this.stomp.subscribe('/topic/friend/signin/' + value.friendId,(data)=>{
            console.log(data);
          });
        });
      }));*/
    this.stomp.after('init').then(()=>{
      this.stomp.subscribe('/topic/friend/signin/' + currentId,(data)=>{
        console.log(data);
      });
    });
  }

  /**
   * 订阅用户登出
   * @param {number} currentid
   */
  subscriptionFriendSignout(currentid: number): void {
    this.stomp.after('init').then(()=>{
      this.stomp.subscribe('/topic/friend/signout/' + currentid, (data)=>{
        console.log(data);
      });
    });
  }

  /**
   * 订阅系统信息
   */
  subscriptionSystem(): void {
    this.stomp.after('init').then(()=>{
      this.stomp.subscribe('/topic/systemInfo' ,(data)=>{
        console.log(data);
      });
    });
  }
  receiveMsg(): void {
  }

}
