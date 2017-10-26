import {User} from './user';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {urlString} from '../url.constont';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class UserService {

  constructor(private http: Http, private router: Router) {

  }

  doLogin(user: User): void {
      let body = {nameOrEmail: user.username, password: user.password};
     this.http.post('http://localhost:8080/api/loginAct', body).subscribe(data =>{
       console.log(data);
     });

}
}
