/*
import {Directive, Input, TemplateRef, ElementRef, ViewContainerRef} from '@angular/core';

declare var jQuery: any;

@Directive({
  selector: '[imgdirecitve]'
})
export class ImgDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }
  @Input()
  setContent(content: any) {
    console.log(this.templateRef);
    console.log(this.viewContainer);
    if (content) {
      if (content.match('^!*{1,})$').length > 0) {
         jQuery('#markdown').children('img').forEach( child => {
          console.log(child.width);
          console.log(child.height);
         });

      }
    }
  }
}
*/
import {Directive, Input, Output, TemplateRef, ViewContainerRef} from '@angular/core';

/**
 * Add the template content to the DOM unless the condition is true.
 */
@Directive({ selector: '[appUnless]'})
export class UnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }
  @Input()
  @Output()
   appUnless(condition: string) {
    return condition;
  }
}
