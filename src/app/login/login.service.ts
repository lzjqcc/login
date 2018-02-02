import {User} from './user';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {baseURL} from '../url.constont';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class UserService {

  constructor(private http: Http, private router: Router) {

  }


// application/x-www-form-urlencoded
  doLogin(user: User) {
    const body = {email: user.email, password: user.password};
    // 'email=bar&password=moe' 使用与@RequestParam

    return this.http.post(baseURL + 'loginAct', body, {headers: new Headers({'Content-type': 'application/json'})} ).map((response: Response) => {
      // login successful if there's a jwt token in the response
      let user = response.json();
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      console.log(user);
      return user;
    });
  }
}
