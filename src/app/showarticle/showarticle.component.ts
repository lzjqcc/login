import {Component} from '@angular/core';

/**
 * @title Dynamic grid-list
 */
@Component({
  selector: 'show-article',
  templateUrl: './showarticle.component.html',
})
export class ShowarticleComponent {
  tiles = [
    {text: 'top', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'left', cols: 1, rows: 2, color: 'lightblue'},
    {text: 'mid', cols: 2, rows: 2, color: 'lightgreen'},
    {text: 'right', cols: 1, rows: 2, color: 'lightpink'},
    {text: 'bottm', cols: 4, rows: 1, color: '#DDBDF1'},
  ];
}
