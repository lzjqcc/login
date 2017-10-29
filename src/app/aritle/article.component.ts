import {
  AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, OnChanges, OnInit, Renderer2,
  SimpleChanges, TemplateRef, ViewChild
} from '@angular/core';
import {TipInfo} from './article.tip';
import {stringDistance} from "codelyzer/util/utils";

declare var jQuery: any;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})


export class ArticleComponent implements OnInit, AfterContentChecked {


  content: string;
  private lastColor: string;
  tip: TipInfo;
  private rightPre: any;
  private leftPre: any;
  private preFlag: boolean;
  private cursorPosition: number;
  leftMousePosition = {
    top : 0,
    left : 0
  };
  /* @ViewChild('#help') 这个表示在需找<p #help></p> 这种标签 el.nativeElement表示html中原始标签
   el: ElementRef;*/
  ngAfterContentChecked(): void {
  }

  constructor(private render: Renderer2, private el: ElementRef) {

  }

  ngOnInit(): void {
    this.tip = new TipInfo();
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
  /*  console.log(this.getLeftPreNativeElement().innerText.length);
    console.log(this.getLeftPreNativeElement().innerText);*/
     const range = window.getSelection().getRangeAt(0);
     console.log(range.getBoundingClientRect());
/*     this.leftMousePosition.height = range.getBoundingClientRect().height;
     this.leftMousePosition.width = range.getBoundingClientRect().width;
     this.leftMousePosition.bottom = range.getBoundingClientRect().bottom;
     this.leftMousePosition.right = range.getBoundingClientRect().right;*/
     this.leftMousePosition.top = range.getBoundingClientRect().top;
     this.leftMousePosition.left = range.getBoundingClientRect().left;
  }
  private createElementSpan(left: number, top: number) {
    const children = this.getLeftPreNativeElement().children[0].children;
    for ( let child in children){

    }
    let p = document.createElement('span');
    this.getLeftPreNativeElement().children[0].appendChild(p);
    p.innerHTML = 'a;skdfj';
    p.style.position = 'absoluate';
    p.style.top = top + 'px';
    p.style.left = left + 'px';
  }
  onClick() {
    // this.content = this.getLeftPreNativeElement().children[0].innerText = this.removeLastN(this.getLeftPreNativeElement().children[0].innerText) + 'dd';
   // this.setCursorContent(this.cursorPosition, '真实才');
    this.createElementSpan(this.leftMousePosition.top , this.leftMousePosition.left);
    console.log(this.cursorPosition);
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
    console.log(document.getSelection().focusOffset+"px");
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
}
