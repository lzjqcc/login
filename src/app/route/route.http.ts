import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {baseURL} from "../url.constont";
@Injectable()
export class RouteHttp {
  constructor(private http: Http, private router: Router) {

  }
  /**
   * 传入的参数为json类型的数据
   * @param params
   */
  doPost (params: any, url: string, isSaveLocal?: boolean, saveKey?: string) {
    // 'nameOrEmail=bar&password=moe' 使用与@RequestParam
    const  headers = {headers: new Headers({'Content-type': 'application/x-www-form-urlencoded'})}

    return this.http.post(baseURL + url, this.connectParamsWithAnd(params), headers ).map((response: Response) => {
      // login successful if there's a jwt token in the response
      let json = response.json();
      if (isSaveLocal && json.result === 'success') {
        localStorage.setItem(saveKey, JSON.stringify(json));
      }

      return json;
    });
  }
  doGet(params: any, url: string) {
    const body = this.connectParamsWithAnd(params);
    const headers = {headers: new Headers({'Content-type': 'application/x-www-form-urlencoded'}), params: body};
    return this.http.get(baseURL + url,  headers).map((response: Response) => {
      return response.json();
    });
  }
  private connectParamsWithAnd(params: any) {
    let getParams: string = '';
    for (let param in params) {
      getParams += param + '=' + params[param] + '&';
    }
    return getParams.substr(0, getParams.length - 1);
  }
}
