import { Component } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ToDo } from '../../model/todo.model';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NavbarComponent, CdkDrag, CdkDropList],
  templateUrl: './board.component.html',

  // hay que poner estilos para que el drag and drop se vea bien
  // en la documentacion de drag and drop, en la seccion animation hay un ejemplo de estilos -> https://material.angular.io/cdk/drag-drop/overview#animations
  styles: [
    `
      /* Animate items as they're being sorted. */
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      /* Animate an item that has been dropped. */
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `
  ]
})
export class BoardComponent {
  todos: ToDo[] = [
    {
      id: '1',
      title: 'Task 1'
    },
    {
      id: '2',
      title: 'Task 2'
    },
    {
      id: '3',
      title: 'Task 3'
    }
  ]
  drop(event: CdkDragDrop<any[]>) {
    // el evento contiene informacion sobre el item que se esta moviendo -> en especial el previousIndex y el currentIndex
    console.log(event);

    // se usa la funcion moveItemInArray para mover el item en el array
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }
}
