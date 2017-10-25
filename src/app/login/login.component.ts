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
  user: User = {
    username: 'dd',
    password: '123'
  };
  username: string;
  constructor(private alertService: AlertService, private userService: UserService) {
  }

  doLogin(): void {
    let resulet = this.userService.doLogin(this.user);
    console.log(resulet);
    this.alertService.injectMessage(resulet);
  }
}
