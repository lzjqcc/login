import { Component ,Output,Input} from '@angular/core';
import {ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material";
export interface Person {
  name: string;
}
@Component({
  selector: 'chips',
  templateUrl: './chips.component.html',
})
export class ChipsComponent {
  title = 'app';
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER];
  @Output()@Input()
  fruits = [
    { name: 'Lemon' },
    { name: 'Lime' },
    { name: 'Apple' },
  ];
  onClick(event: any) {
    console.log(event);
    event.stopPropagation();
    event.preventDefault();
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our person
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    let index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
}
