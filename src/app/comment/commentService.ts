import {Comment} from '../login/user';
import {Injectable} from '@angular/core';
import {UserService} from '../login/login.service';
@Injectable()
export class CommentService {
  comment: Comment = new Comment();
  constructor(private userService: UserService) {

  }
  public getCurrentAccountId(): number {
    return this.userService.getCurrentAccountId();
  }
  public getArticleId(): number {
    return this.comment.articleId;
  }
  public setArticleId(articleId: number): void {
    this.comment.articleId = articleId;
  }
}
