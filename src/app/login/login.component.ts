import {Component} from '@angular/core';
import {UserService} from './login.service';
import {User} from './user';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string;
  user: User = {
    username: 'dd',
    password: '123'
  };
  username: string;

  constructor( private userService: UserService) {
  }

  doLogin(): void {
    let resulet = this.userService.doLogin(this.user);
    console.log(resulet);
    this.message = resulet;
  }
}
