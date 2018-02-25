import {Component} from '@angular/core';
import {RouteHttp} from '../route/route.http';
import {ActivatedRoute} from '@angular/router';
import {Observable} from '_rxjs@5.5.6@rxjs/Observable';
import {baseURL} from '../url.constont';
import {Assortment, DateLab} from '../login/user';
import {CommentService} from '../comment/commentService';
import { DatePipe } from '@angular/common';

/**
 * @title Dynamic grid-list
 */
@Component({
  selector: 'show-article',
  templateUrl: './showarticle.component.html',
  styleUrls: ['./showarticle.component.css']
})

export class ShowarticleComponent {
  childTitle: any = new Array();
  title: string;
  content: string;
  currentAccountId: any;
  toAccountId: number;
  dateList: any = new Array();
  assortmentList: any = new Array();

  constructor(protected http: RouteHttp, protected route: ActivatedRoute) {
    const id: Observable<string> = route.params.map(p => p.id);
    id.subscribe(data => {
      this.http.doGet('/articles/findById/' + data).subscribe(response => {
        this.title = response.result.article.title;
        this.content = response.result.article.content;
        this.splitChildTitle(this.content);
        this.currentAccountId = response.result.article.currentAccountId;
        this.http.doGet('/articles/findGroupByCreateTime/' + this.currentAccountId).subscribe(response => {
          for (var key in response.result) {
            let date = new DateLab();
            date.create = key;
            date.count = response.result[key];
            this.dateList.push(date);
          }
        });
        this.http.doGet('/articles/findGroup/' + this.currentAccountId).subscribe(response => {
          for (var index in response.result) {
            let assortment = new Assortment();
            assortment.articleNum = response.result[index].articleNum;
            assortment.assortmentName = response.result[index].assortmentName;
            this.assortmentList.push(assortment);
          }
        });

      });
    });
  }

  splitChildTitle(content: string): any {
    let values = content.split('\n');
    for (let value of values) {
      if (value.startsWith('#')) {
        for (let i = 0; i < value.length; i++) {
          if (value.charAt(i) != '#') {
            this.childTitle.push(value.substr(i));
            break;
          }
        }
      }
    }
  }

  tiles = '# 伊甸关系\n' +
    '埃里克的飞机\n' +
    '## 开始大幅\n' +
    '数量的咖啡机为入境\n' +
    '### 山卡拉地方看\n' +
    '卡进度反馈#看垃圾啊开始大幅';
}
