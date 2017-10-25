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

  doLogin(user: User): string {
    /*return this.http.post(urlString + 'login', user).subscribe(data => {

    });*/

    if (!(user.password === '123' && user.username === 'li')) {
      return 'fail';
    }
    this.router.navigateByUrl('/success');
    return null;
  }
}
