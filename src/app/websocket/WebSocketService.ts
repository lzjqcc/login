import {Injectable} from "@angular/core";
import { StompService } from 'ng2-stomp-service';
import {baseURL} from '../url.constont';
// https://www.npmjs.com/package/ng2-stomp-service
@Injectable()
export class WebSocketService {
  private subscription: any;
  constructor(stomp: StompService) {
    stomp.configure({host: baseURL + '/endpointWisely',  debug: true, queue: {'init': false}});
    stomp.startConnect().then(() => {
      stomp.done('init');
      console.log('connected');
       this.subscription = stomp.subscribe('/topic/top', (message, heads) => {
         console.log('websocket');
         console.log(message);
       });
    });
  }
  receiveMsg(): void {

  }

}
