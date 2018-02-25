import {User} from './user';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {baseURL} from '../url.constont';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class UserService {
  private currentAccountId: number;
  private currentAccountName: string;
  private headIcon: string;
  constructor(private http: Http, private router: Router) {

  }
  public setHeadIcon(icon: string)  {
    this.headIcon = icon;
  }
  public getHeadIcon(): string {
    return this.headIcon;
  }
  public setCurrentAccountName(currentAccountName: string): void {
    this.currentAccountName = currentAccountName;
  }
  public getCurrentAccountName(): string {
    return this.currentAccountName;
  }
  public setCurrentAccountId(currentAccountId: number): void {
    this.currentAccountId = currentAccountId;
  }
  public getCurrentAccountId(): number {
    return this.currentAccountId;
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
