import {Injectable} from '@angular/core';
import {ErrorDialog} from './error.dialog';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';



@Injectable()
export class ErrorDialogService {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
  }
  openModalWithComponent(body: any, title?: any) {
    if (!title) {
      title = '错误提示!';
    }
    const initialState = {
      error: body,
      title: title
    };
    this.bsModalRef = this.modalService.show(ErrorDialog, {initialState});
    this.bsModalRef.content.closeBtnName = '关闭';
  }
}
