import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [NgClass],
  templateUrl: './btn.component.html'
})
export class BtnComponent {
  @Input() typeBtn: ('submit' | 'button' | 'reset') = 'button';
  @Input() color: keyof typeof this.mapColors = 'primary';

  mapColors = {
    success: 'text-white bg-success-500 hover:bg-success-600 focus:ring-success-300',
    danger: 'text-white bg-red-500 hover:bg-red-600 focus:ring-red-300',
    primary: 'text-white bg-primary-500 hover:bg-primary-600 focus:ring-primary-300',
    'gray-light': 'text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-100'
  };

  get colors() {
    // de esta forma hacemos que tailwind incluya las clases de colores en el boundle final y las podamos usar dinamicamente
    // esta es una forma de hacerlo
    // return {
    //   'bg-success-500': this.color === 'success',
    //   'hover:bg-success-600': this.color === 'success',
    //   'focus:ring-success-300': this.color === 'success',
    //   'bg-primary-500': this.color === 'primary',
    //   'hover:bg-primary-600': this.color === 'primary',
    //   'focus:ring-primary-300': this.color === 'primary',
    // }

    // pero esta forma de hacerlo es mucho mas limpia y mantenible
    // const colorsList: { [key: string]: string } = {
    //   success: 'text-white bg-success-500 hover:bg-success-600 focus:ring-success-300',
    //   danger: 'text-white bg-red-500 hover:bg-red-600 focus:ring-red-300',
    //   primary: 'text-white bg-primary-500 hover:bg-primary-600 focus:ring-primary-300',
    //   'gray-light': 'text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-100'
    // };
    return this.mapColors[this.color];
  }
}
