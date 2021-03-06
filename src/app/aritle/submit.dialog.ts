import {Component, Input, Inject, OnInit, AfterViewInit, ElementRef, Renderer2} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {RouteHttp} from '../route/route.http';
import {Router} from '@angular/router';
import {ErrorDialog} from '../errordialog/error.dialog';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import {ErrorDialogService} from '../errordialog/error.dialog.service';
import {Assortment} from '../login/user';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './submit.dialog.html',
})

export class SubmitDialog implements OnInit, AfterViewInit {

  states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia'];
  bsModalRef: BsModalRef;
  selectedValue: string;
  chip: string = '';
  chipGroup = new Map<any, string>();
  newIndex: number = 0;
  isSupport: any;
  assortmentList: any = new Array();
  params = {
    content: '',
    title: '',
    assortment: '',
    top: 0,
    toTop: false,
    tips: ''
  };
  @Input()
  tips = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

  constructor(protected dialog: MatDialog, private  router: Router, @Inject(MAT_DIALOG_DATA) public data: any,
              private http: RouteHttp, private el: ElementRef, private render: Renderer2, protected errorDialogService: ErrorDialogService) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
  }

  private jsonToString(josn: any): string {
    if (josn != null) {
      return JSON.stringify(josn);
    }
    return null;
  }

  submit() {
    this.params.content = this.data.content;
    this.params.title = this.data.title;
    this.params.assortment = this.selectedValue;
    this.params.top = this.data.top;
    this.params.toTop = this.isSupport;
    this.params.tips = this.jsonToString(this.tips);
    console.log(this.params);
    this.http.doPost(this.params, '/articles/insertArticle').subscribe(data => {
      // todo 显示提交错误的窗口
      if (data.success) {
        this.router.navigateByUrl('/showarticle/' + data.result);
      }else {
        console.log('alskdf');
      }
    }, error => {
      const body = error._body;
      this.errorDialogService.openModalWithComponent(body);
    });
  }
  onKeyUp(event: any) {
    console.log(this.isSupport);
    if (event.code === 'Enter') {
      if (!this.chip) {
        return;
      }

      this.chipGroup.set(this.newIndex,this.chip);
      this.createChips(this.chip.trim());
      this.chip = '';
      this.newIndex++;
    }
  }
  private createChips(text: string) {
    const chipGroup = this.el.nativeElement.querySelector('#chipGroup');
    this.createDiv(chipGroup, text);
  }
  private createDiv(parent: any, text: string) {

    const div = this.render.createElement('div');
    div.innerText = text;
    div.setAttribute('id', this.newIndex);
    this.render.insertBefore(parent, div, this.el.nativeElement.querySelector('#chips'));
    this.render.addClass(div, 'chip');
    const i = this.render.createElement('i');
    this.render.appendChild(div, i);
    this.render.addClass(i, 'material-icons');
    this.render.addClass(i, 'close');
    i.innerText = 'close';
    i.addEventListener('click', event => {
      const index = Number.parseInt(i.parentElement.getAttribute('id'));
      this.chipGroup.delete(index);
      i.parentElement.remove();
      console.log(this.chipGroup);
    });

  }

}
