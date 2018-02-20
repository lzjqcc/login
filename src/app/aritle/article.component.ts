import {
  AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, OnChanges, OnInit, Output, Renderer2,
  SimpleChanges, TemplateRef, ViewChild
} from '@angular/core';
import {MoreField, TipInfo} from './article.tip';
import {stringDistance} from "codelyzer/util/utils";
import {MatDialog, MatDialogRef} from "@angular/material";
import { ImageDialog} from "./image.dialog";
import {SubmitDialog} from "./submit.dialog";
import {ArticleSertice} from "./article.sertice";
import {ErrorDialog} from '../errordialog/error.dialog';

declare var jQuery: any;
declare let ace: any;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit, AfterContentChecked {
  lastAfterClosedResult: string;
  lastBeforeCloseResult: string;
  dialogRef: MatDialogRef<ImageDialog> | null;
  editor: any;
  value: string;
  @Output()
  content: string;
  private lastColor: string;
  tip: TipInfo;
  private rightPre: any;
  private leftPre: any;
  private preFlag: boolean;
  private cursorPosition: number;
  moreFeild: MoreField;

  /* @ViewChild('#help') 这个表示在需找<p #help></p> 这种标签 el.nativeElement表示html中原始标签
   el: ElementRef;*/
  ngAfterContentChecked(): void {

  }

  moreClick(name: string) {
    if (name === this.moreFeild.submit) {
      this.dialog.open(SubmitDialog,{
        width: '40%',
        height: '50%',
        data: {title: this.value, content: this.content}
      });
    }
  }

  constructor(private render: Renderer2, private el: ElementRef, private dialog: MatDialog , private articleService: ArticleSertice) {
  }

  onClick() {
    this.openImageDialog();
  }

  ngOnInit(): void {
    this.moreFeild = new MoreField();
    this.tip = new TipInfo();
    let editorElement = this.getLeftPreNativeElement().children[0];
    this.editor = ace.edit(editorElement);
    this.editor.$blockScrolling = Infinity;
    this.editor.getSession().setUseWrapMode(true);
    this.editor.getSession().setMode('ace/mode/markdown');
    this.editor.on("change", (e: any) => {
      let val = this.editor.getValue();
      this.content = val;
    });
    this.articleService.setEditor(this.editor);
    this.articleService.setRightPre(this.getRightPreNativeElement());
  }
  /**
   * TipInfo 鼠标悬浮显示TipInfo中信息,并修改颜色
   * @param {string} id
   */
  mouseOver(id: string) {
    // console.log(this.el);
    // 根el 表示一个 <app-article><app-article>
    const queryElement = this.el.nativeElement.querySelector('#' + id);
    this.render.setStyle(queryElement, 'color', 'red');
  }

  /**
   *鼠标移开颜色还原
   * @param {string} id
   */
  mouseLeave(id: string) {
    const queryElement = this.el.nativeElement.querySelector('#' + id);
    this.render.setStyle(queryElement, 'color', null);
  }

  /**
   * pre 关联滑动
   * @param {string} flag
   */
  scroll(flag: string) {
    if (flag === 'right' && this.preFlag) {
      // console.log(this.getRightPreNativeElement().scrollHeight+":"+this.getRightPreNativeElement().offsetTop);
      // console.log(this.getRightPreNativeElement().scrollTop);

      this.getLeftPreNativeElement().scrollTop = this.getRightPreNativeElement().scrollTop;
      // console.log(this.getLeftPreNativeElement());
    } else if (flag === 'left' && !this.preFlag) {
      //  console.log(this.getRightPreNativeElement().scrollTop);
      this.getRightPreNativeElement().scrollTop = this.getLeftPreNativeElement().scrollTop;
    }
  }

  /**
   * pre 标签鼠标悬浮
   * @param {string} flag
   */
  public preMouseOver(flag: string) {
    if (flag === 'right') {
      this.preFlag = true;
    } else if (flag === 'left') {
      this.preFlag = false;
    }
  }

  private getRightPreNativeElement(): any {
    if (this.rightPre == null) {
      this.rightPre = this.el.nativeElement.querySelector('#rightPre');
    }
    return this.rightPre;
  }

  private getLeftPreNativeElement(): any {
    if (this.leftPre == null) {
      this.leftPre = this.el.nativeElement.querySelector('#leftPre');
    }
    return this.leftPre;
  }

  keyUp(event: any) {
    console.log(event);
  }

  divClick() {

    /*  console.log(window.getSelection().anchorOffset + ":" + window.getSelection().rangeCount);
      console.log(window.getSelection().getRangeAt(0).startOffset);
      console.log(window.getSelection().getRangeAt(0).endOffset);
      console.log(window.getSelection().focusOffset);*/
    this.cursorPosition = document.getSelection().getRangeAt(0).endOffset;
    console.log();
  }

  setCursorContent(index: number, content: string) {
    var node = this.getLeftPreNativeElement().children[0];
    node.focus();
    var textNode = node.firstChild;
    console.log(textNode);
    console.log(node);
    var caret = index; // insert caret after the 10th character say
    var range = document.createRange();

    range.setStart(textNode, index);
    range.setEnd(textNode, index);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    // 在光标闻之插入
    document.execCommand('insertTEXT', false, '' + content + '');
  }

  insertContent(type: string) {
    this.articleService.insertContent(this.editor, type);
  }

  private openImageDialog() {
    this.dialog.open(ErrorDialog);
  }
}
