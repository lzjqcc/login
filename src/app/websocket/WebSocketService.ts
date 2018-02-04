import {Injectable} from "@angular/core";
import {$WebSocket, WebSocketConfig} from "angular2-websocket/angular2-websocket";

@Injectable()
export class WebSocketService {
   ws: $WebSocket;
  constructor() {
    this.ws = new $WebSocket('ws://localhost:8080/endpointWisely/websocket');
    this.ws.getDataStream().subscribe(body => {
      console.log(body);
    });
    this.ws.onOpen(cb => {
      console.log("连接成功");
    });
   this.ws.onClose(cb =>{
     console.log("连接关闭");
   });
  }

  receiveMsg(): void {
    this.ws.onMessage((msg: MessageEvent) => {
      console.log('message', msg.data);
    });
  }
  sendMsg(msg: string): void {
    this.ws.send(msg).subscribe((d) => {
      console.log(d.data);
    },(d) =>{
      console.log('error：' + d.data);
    }, () => {
      console.log('complete');
    });
  }
  close(): void {
    this.ws.close(true);
}
}
