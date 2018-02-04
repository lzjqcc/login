import {Injectable} from '@angular/core';
@Injectable()
export class ArticleSertice {
  editor: any;
  rightPre: any;
  public setEditor(editor: any) {
    this.editor = editor;
  }
  public getEditor() {
    return this.editor;
  }
  public setRightPre(rightPre: any) {
    this.rightPre = rightPre;
  }
  public getRightPre() {
    return this.rightPre;
  }
  public insertContent(editor: any, type: string , content?: string) {
    if (!editor) return;
    let selectedText = editor.getSelectedText();
    let isSeleted = !!selectedText;
    let startSize = 2;
    let initText: string = '';
    let range = editor.selection.getRange();
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
        selectedText = `![](` + content + `)`;
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
    editor.session.replace(range, selectedText);

    if (!isSeleted) {
      range.start.column += startSize;
      range.end.column = range.start.column + initText.length;
      editor.selection.setRange(range);
    }
    /*console.log(range);
    console.log(range.start.column);
    console.log(this.editor);
    // this.editor.focus();
    console.log(this.cursorPosition);*/
  }
}
