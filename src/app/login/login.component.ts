import {Component} from '@angular/core';
import {AlertService} from '../alter/alert.service';
import {UserService} from './login.service';
import {User} from './user';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User;

  constructor(private alertService: AlertService, private userService: UserService) {
  }

  doLogin(user: User): void {
    let resulet = this.userService.doLogin(user);
    this.alertService.injectMessage(resulet);
  }
}
