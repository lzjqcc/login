import {Injectable} from "@angular/core";

@Injectable()
export class AlertService {
   message: string;

  injectMessage(message: string): void {
    this.message = message;
  }
}
