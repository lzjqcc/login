import {Component, Renderer2, ElementRef, ViewChild, ViewContainerRef, Input} from '@angular/core';
import {RouteHttp} from '../route/route.http';
import {Comment} from '../login/user';
import {CommentService} from './commentService';
import {ErrorDialogService} from '../errordialog/error.dialog.service';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

/**
 * @title Dynamic grid-list
 */
@Component({
  selector: 'show-comment',
  templateUrl: './showcomment.component.html',
  styleUrls: ['./showcomment.component.css']
})
export class ShowcommentComponent {
  comment: Comment = new Comment();
  @Input()
  toAccountId: number;
  dd: string;
  currentAccountName: string;
  fromAccountId: number;
  //@ViewChild('container', {read: ViewContainerRef}) container;
  constructor(private http: RouteHttp, protected commentService: CommentService,
              protected errorDialg: ErrorDialogService, private render: Renderer2,
              private el: ElementRef, private datePipe: DatePipe, protected route: ActivatedRoute) {
    this.route.params.subscribe(data => {
      this.comment.articleId = data.id;
      this.http.doGet('/comment/getComments/' + data.id).subscribe(response => {
        if (response.result) {
          this.buildCommentFromWeb(response.result);
        }
      });
    });

  }

  submit(): void {
    this.check();
  }

  check(): void {
    if (!this.comment.comment) {
      this.errorDialg.openModalWithComponent('评论不能为空!', '提示');
      return;
    }
    this.http.doGet('/user/isLogin').subscribe(response => {
      if (response.result) {
        this.currentAccountName = response.result.userName;
        this.fromAccountId = response.result.id;
        let commentP = this.addComment(this.comment.comment, this.currentAccountName, this.commentService.getHeadIcon(), this.fromAccountId, 0);
        this.comment.source = 0;
        this.comment.toAccountId = this.toAccountId;
        console.log(response);
        this.http.doPost(this.comment, '/comment/insertComment').subscribe( response => {
          this.render.setAttribute(commentP, 'id', response.result);
          this.comment.comment = '';
        });
      } else {
        this.errorDialg.openModalWithComponent('请登陆后回复!', '提示');
      }
    });

  }

  insertAfter(newElement: any, targetElement: any): void {
    var parent = targetElement.parentNode;
    console.log(parent.lastChild);
    // 如果最后的节点是目标元素，则直接添加
    if (parent.lastChild == targetElement) {
      parent.appendChild(newElement);
    } else {
      //如果不是，则插入在目标元素的下一个兄弟节点 的前面
      parent.insertBefore(newElement, targetElement.nextSibling);
    }
  }

  replay(event: any): void {
     // console.log(event.path[1].children[1].children[0].innerHTML);
    if (!this.comment.comment) {
      this.errorDialg.openModalWithComponent('评论不能为空!', '提示');
      return;
    }
    this.http.doGet('/user/isLogin').subscribe(response => {
      if (response.result) {
        this.comment.toAccountId = event.path[1].children[1].children[0].id;
        this.comment.currentAccountId = response.result.id;
        this.comment.fromAccountId = response.result.id;
        this.comment.replayComentId = event.path[1].children[event.path[1].children.length - 1].id;
        this.comment.source = 0;
        let commentP;
        if (event.path[2].tagName == 'UL' && event.path[2].id) {
          if (event.path[1].nextElementSibling && event.path[1].nextElementSibling.tagName == 'UL') {
            commentP = this.createLiElement(this.comment.comment, response.result.userName, response.result.src, event.path[1].nextElementSibling, response.result.id, 0, null, event.path[1].children[1].children[0].innerHTML, this.comment.toAccountId);
            console.log('d');

          } else {
            let commentUL = this.el.nativeElement.querySelector('#commentul');
            let childUL = this.render.createElement('ul');
            this.render.setStyle(childUL, 'margin-left', '5%');
            this.render.addClass(childUL, 'list-unstyled');
            commentP = this.createLiElement(this.comment.comment, response.result.userName,  response.result.src, childUL, response.result.id, 0, null, event.path[1].children[1].children[0].innerHTML, this.comment.toAccountId);
            this.insertAfter(childUL, event.path[1]);
            console.log('e');
          }
        } else if (event.path[2].tagName == 'UL' && !event.path[2].id) {
          console.log('a');
          commentP = this.createLiElement(this.comment.comment, response.result.userName, response.result.src, event.path[2], response.result.id, 0, null, event.path[1].children[1].children[0].innerHTML, this.comment.toAccountId);
        }

        this.http.doPost(this.comment, '/comment/insertComment').subscribe( response => {
          this.render.setAttribute(commentP, 'id', response.result);
          this.comment.comment = '';
        });
      } else {
        this.errorDialg.openModalWithComponent('请登陆后回复!', '提示');
      }
    });
  }

  buildCommentFromWeb(responce: any) {
    for (let index in responce) {
      let single = responce[index];
      this.addComment(single.comment, single.fromAccountName, single.src, single.fromAccountId, single.id, single.createTime);
      let lists = single.list;
      this.addReplay(lists);
    }
  }

  addComment(comment: string, fromAccoutName: string, src: string, fromAccountId: number, commentId: number, date?: any): any {
    let commentUL = this.el.nativeElement.querySelector('#commentul');
    return this.createLiElement(comment, fromAccoutName, src, commentUL, fromAccountId, commentId, date);
  }

  createLiElement(comment: string, fromAccountName: string, src: string, parent: any, fromAccountId: any, commentId: number, date?: any, toAccountName?: string, toAccountId?: number): any {
    // 头像
    let li = this.render.createElement('li');
    let image = this.render.createElement('img');
    this.render.addClass(image, 'img-circle');
    li.appendChild(image);
    if (src) {
      this.render.setProperty(image, 'src', src);
    }
    // 姓名
    let nameSpan = this.render.createElement('span');
    let firstA = this.render.createElement('a');
    this.render.setProperty(firstA, 'id', fromAccountId);
    this.render.addClass(firstA, 'btn');
    this.render.addClass(firstA, 'btn-link');
    firstA.text = fromAccountName;
    this.render.appendChild(nameSpan, firstA);
    if (toAccountName) {
      let replaySpan = this.render.createElement('span');
      replaySpan.innerText = '回复';
      nameSpan.appendChild(replaySpan);
      let replayNameA = this.render.createElement('a');
      replayNameA.innerText = toAccountName;
      this.render.setProperty(replayNameA, 'id', toAccountId);
      this.render.addClass(replayNameA, 'btn');
      this.render.addClass(replayNameA, 'btn-link');
      nameSpan.appendChild(replayNameA);
    }
    li.appendChild(nameSpan);

    // 日期
    let dateSpan = this.render.createElement('span');
    this.render.setStyle(dateSpan, 'color', '#9e9e9e');
    if (date) {
      dateSpan.innerText = date;
    } else {
      dateSpan.innerText = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').toString();
    }
    li.appendChild(dateSpan);
    // 回复
    let replayA = this.render.createElement('a');
    this.render.addClass(replayA, 'btn');
    this.render.addClass(replayA, 'btn-link');
    replayA.text = '回复';
    replayA.addEventListener('click', event => {
      this.replay(event);
    });
    li.appendChild(replayA);
    // 评论
    let commentP = this.render.createElement('p');
    this.render.setProperty(commentP, 'id', commentId);
    this.render.setStyle(commentP, 'margin-left', '5%');
    commentP.innerText = comment;
    li.appendChild(commentP);
    this.render.appendChild(parent, li);
    return commentP;
  }

  addReplay(lists: any): void {
    let commentUL = this.el.nativeElement.querySelector('#commentul');
    let childUL = this.render.createElement('ul');
    this.render.setStyle(childUL, 'margin-left', '5%');
    this.render.addClass(childUL, 'list-unstyled');
    for (let i in lists) {
      let inner = lists[i];
      this.createLiElement(inner.comment, inner.fromAccountName, inner.src, childUL, inner.fromAccountId, inner.id, inner.createTime, inner.toAccountName, inner.toAccountId);
    }
    this.render.appendChild(commentUL, childUL);
  }
}
