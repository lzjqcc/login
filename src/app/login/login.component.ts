import {Component} from '@angular/core';
import {UserService} from './login.service';
import {User} from './user';
import {RouteHttp} from "../route/route.http";
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string;
  user: User = {
    email: 'dd',
    password: '123'
  };
  username: string;

  constructor( private http: RouteHttp,private  router: Router) {
  }

  doLogin(): void {
   this.http.doPost(this.user, '/loginBlog', true , 'currentUser').subscribe(data =>{
     if (data.result === 'fail'){
       this.router.navigateByUrl('/login');
     } else {
       this.router.navigateByUrl('/success');
     }
   });
  }
}
