import {Injectable} from "@angular/core";
import { StompService } from 'ng2-stomp-service';
@Injectable()
export class WebSocketService {
  private subscription: any;
  constructor(stomp: StompService) {
    stomp.configure({host: '',  debug: true, queue:{'init': false}});
    stomp.startConnect().then(() =>{
      stomp.done('init');
      console.log('connected');
      //this.subscription = stomp.subscribe('/')
    });
  }

  receiveMsg(): void {
  }

}
