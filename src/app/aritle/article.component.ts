import {
  AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, OnChanges, OnInit, Output, Renderer2,
  SimpleChanges, TemplateRef, ViewChild
} from '@angular/core';
import {TipInfo} from './article.tip';
import {stringDistance} from "codelyzer/util/utils";
import {MatDialog} from "@angular/material";

declare var jQuery: any;
declare let ace: any;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit, AfterContentChecked {

  editor: any;
  @Output()
  content: string;
  private lastColor: string;
  tip: TipInfo;
  private rightPre: any;
  private leftPre: any;
  private preFlag: boolean;
  private cursorPosition: number;

  /* @ViewChild('#help') 这个表示在需找<p #help></p> 这种标签 el.nativeElement表示html中原始标签
   el: ElementRef;*/
  ngAfterContentChecked(): void {

  }

  constructor(private render: Renderer2, private el: ElementRef, private dialog: MatDialog) {

  }

  ngOnInit(): void {
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
  }

  /**
   * TipInfo 鼠标悬浮显示TipInfo中信息,并修改颜色
   * @param {string} id
   */
  mouseOver(id: string) {
    // console.log(this.el);
    // 根el 表示一个 <app-article><app-article>
    const queryElement = this.el.nativeElement.querySelector('#' + id);

    this.lastColor = queryElement.style.color;
    this.render.setStyle(queryElement, 'color', 'red');
    // console.log(queryElement.style.color);
  }

  /**
   *鼠标移开颜色还原
   * @param {string} id
   */
  mouseLeave(id: string) {
    //  console.log(id);
    const queryElement = this.el.nativeElement.querySelector('#' + id);
    this.render.setStyle(queryElement, 'color', this.lastColor);
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
  private preMouseOver(flag: string) {
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

  onClick() {
    // this.content = this.getLeftPreNativeElement().children[0].innerText = this.removeLastN(this.getLeftPreNativeElement().children[0].innerText) + 'dd';
    // this.setCursorContent(this.cursorPosition, '真实才');

  }


  /**
   * 移除最后的换行符
   * @param {string} value
   * @returns {string}
   */
  private removeLastN(value: string): string {
    const array = value.match('\n$');
    if (array && array.length > 0) {

      return value.substring(0, value.length - 1);
    }
    return value;
  }

  /**
   * 用于拼接字符串
   * @param {string} innerText
   * @param {string} value
   * @param {number} index
   */
  private append(innerText: string, value: string, index: number) {
    const text = this.removeLastN(innerText);
    const content = text.substring(0, index - 1) + value + text.substring(index);
    return content;
  }

  /**
   * 获取插入的位置
   */
  private getIndex() {

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
    console.log(this.editor);
    if (!this.editor) return;
    let selectedText = this.editor.getSelectedText();
    let isSeleted = !!selectedText;
    let startSize = 2;
    let initText: string = '';
    let range = this.editor.selection.getRange();
    switch (type) {
      case 'Bold':
        initText = 'Bold Text';
        selectedText = `**${selectedText || initText}**`;
        break;
      case 'Italic':
        initText = 'Italic Text';
        selectedText = `*${selectedText || initText}*`;
        startSize = 1;
        break;
      case 'Heading':
        initText = 'Heading';
        selectedText = `# ${selectedText || initText}`;
        break;
      case 'Refrence':
        initText = 'Refrence';
        selectedText = `> ${selectedText || initText}`;
        break;
      case 'Link':
        selectedText = `[](http://)`;
        startSize = 1;
        break;
      case 'Image':
        selectedText = `![](http://)`;
        break;
      case 'Ul':
        selectedText = `- ${selectedText || initText}`
        break;
      case 'Ol':
        selectedText = `1. ${selectedText || initText}`
        startSize = 3;
        break;
      case 'Code':
        initText = 'Source Code';
        selectedText = "```language\r\n" + (selectedText || initText) + "\r\n```";
        startSize = 3;
        break;
    }
    this.editor.session.replace(range, selectedText);

    if (!isSeleted) {
      range.start.column += startSize;
      range.end.column = range.start.column + initText.length;
      this.editor.selection.setRange(range);
    }
    console.log(range);
    console.log(range.start.column);
    console.log(this.editor);
    this.editor.focus();
    console.log(this.cursorPosition);
    this.dialog.open(IFrameDialog,{
      height: '400px',
      width: '600px',
    });
  }
}
@Component({
  selector: 'demo-iframe-dialog',
  styles: [
    `iframe {
      width: 800px;
    }`
  ],
  template: `
    <h2 mat-dialog-title>Delete all</h2>
    <mat-dialog-content>Are you sure?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>No</button>
      <!-- Can optionally provide a result for the closing dialog. -->
      <button mat-button [mat-dialog-close]="true">Yes</button>
    </mat-dialog-actions>
  `
})
export class IFrameDialog {
}
