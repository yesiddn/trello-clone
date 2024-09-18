import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { COLORS, Colors } from '../../../../model/colors.model';

@Component({
  selector: 'app-card-color',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card-color.component.html'
})
export class CardColorComponent {
  @Input() color: Colors = 'sky';

  // mapColors = {
  //   sky: 'bg-sky-500 hover:bg-sky-600 text-white',
  //   yellow: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  //   green: 'bg-green-500 hover:bg-green-600 text-white',
  //   red: 'bg-red-500 hover:bg-red-600 text-white',
  //   violet: 'bg-violet-500 hover:bg-violet-600 text-white',
  //   gray: 'bg-gray-500 hover:bg-gray-600 text-white',
  // };

  mapColors = COLORS;

  get colors() {
    return this.mapColors[this.color] ? this.mapColors[this.color] : this.mapColors.sky;
  }
}
