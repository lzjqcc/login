import {Component, Renderer2, ElementRef} from '@angular/core';
import {RouteHttp} from '../route/route.http';
import {Comment} from '../login/user';
import {CommentService} from './commentService';
import {ErrorDialogService} from '../errordialog/error.dialog.service';
import { DatePipe } from '@angular/common';
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
  dd: string;
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
    this.addComment(this.comment.comment, 'li', '/', 1, 2);
  }
  check(): void {
    this.http.doGet('/user/isLogin').subscribe(response=> {
      if (response.result) {

      }else {
        this.errorDialg.openModalWithComponent('请登陆后回复!', '提示');
      }
    });
    if (!this.comment) {
      this.errorDialg.openModalWithComponent('评论不能为空!', '提示');
    }
  }
  replay(event: any): void {
     this.check();
    console.log(event.path);
    console.log();
    if (this.render.nextSibling(event.path[1]) && this.render.nextSibling(event.path[1]).nextSibling && this.render.nextSibling(event.path[1]).nextSibling.tagName == 'UL') {
       this.addReplay(this.comment.comment, 'li', '/', 'ac', this.render.nextSibling(event.path[1]).nextSibling, 2, 1, 2);
    }else {
      this.createLiElement(this.comment.comment, 'li', '/', event.path[2], 2,  1, 'abc', 2);
    }
    this.comment.toAccountId = event.path[1].children[1].children[0].id;
    this.comment.currentAccountId = this.commentService.getCurrentAccountId();
    this.comment.fromAccountId = this.commentService.getCurrentAccountId();
    this.comment.replayComentId = event.path[1].children[event.path[1].children.length-1].id;
    this.comment.source = 0;
    this.http.doPost(this.comment, '/comment/insertComment');
  }
  buildCommentFromWeb(responce: any) {
    for (let index in responce) {
      let single = responce[index];
    }
  }
  addComment(comment: string, name: string, src: string, id: number, commentId: number): void{
   let commentUL =  this.el.nativeElement.querySelector('#commentul');
    this.createLiElement(comment, name, src, commentUL, id, commentId);
  }
  createLiElement(comment: string, name: string, src: string, parent: any, id: any,  commentId: number, replayName?: string, replayId?: number ): void {
    // 头像
    let li = this.render.createElement('li');
    let image = this.render.createElement('img');
    li.appendChild(image);
    this.render.setProperty(image, 'src', src);
    // 姓名
    let nameSpan = this.render.createElement('span');
    let firstA = this.render.createElement('a');
    this.render.setProperty(firstA, 'id', id);
    this.render.addClass(firstA, 'btn');
    this.render.addClass(firstA, 'btn-link');
    firstA.text = name;
    this.render.appendChild(nameSpan, firstA);
    if (replayName) {
      let replaySpan = this.render.createElement('span');
      replaySpan.innerText = '回复';
      nameSpan.appendChild(replaySpan);
      let replayNameA = this.render.createElement('a');
      replayNameA.innerText = replayName;
      this.render.setProperty(replayNameA, 'id', replayId);
      this.render.addClass(replayNameA, 'btn');
      this.render.addClass(replayNameA, 'btn-link');
      nameSpan.appendChild(replayNameA);
    }
    li.appendChild(nameSpan);

    // 日期
    let dateSpan = this.render.createElement('span');
    this.render.setStyle(dateSpan, 'color', '#9e9e9e');
    dateSpan.innerText = this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString();
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
  }
  addReplay(comment: string, name: string, src: string, replayName: string, parent: any, id: number, replayId: number, commentId: number): void{
    let commentUL =  this.el.nativeElement.querySelector('#commentul');
    let childUL = this.render.createElement('ul');
    this.render.setStyle(childUL, 'margin-left', '5%');
    this.createLiElement(comment, name, src, parent, id, commentId, replayName , replayId);
    this.render.appendChild(commentUL, childUL);
  }
}
