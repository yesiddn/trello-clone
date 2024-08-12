import { Component, inject } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Column, ToDo } from '../../model/todo.model';
import { TodoModalComponent } from '../../components/todo-modal/todo-modal.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NavbarComponent, CdkDrag, CdkDropList, CdkDropListGroup],
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
  private dialog = inject(Dialog);

  columns: Column[] = [
    {
      title: 'To Do',
      todos: [
        {
          id: '1',
          title: 'Task 1'
        },
        {
          id: '2',
          title: 'Buy a unicorn'
        },
        {
          id: '3',
          title: 'Sell a oven'
        }
      ]
    },
    {
      title: 'Doing',
      todos: [
        {
          id: '4',
          title: 'Task 4'
        }
      ]
    },
    {
      title: 'Done',
      todos: []
    }
  ];

  todos: ToDo[] = [];
  doing: ToDo[] = [];
  done: ToDo[] = [];

  drop(event: CdkDragDrop<ToDo[]>) {
    // el evento contiene informacion sobre el item que se esta moviendo -> en especial el previousIndex y el currentIndex
    console.log(event);

    // se usa la funcion moveItemInArray para mover el item en el array
    // moveItemInArray(this.todos, event.previousIndex, event.currentIndex);

    // ahora hay que diferenciar en que lista se esta moviendo el item
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data, // se pasa la anterior lista
        event.container.data, // se pasa la nueva lista
        event.previousIndex, // se pasa el indice del item en la lista anterior
        event.currentIndex // se pasa el indice en la nueva lista
      );
    }
  }

  addColumn() {
    this.columns.push({
      title: 'New Column',
      todos: []
    });
  }

  openDialog(todo: ToDo) {
    const dialogRef = this.dialog.open(TodoModalComponent, {
      minWidth: '250px',
      maxWidth: '50%',
      // autoFocus: true
      // con data se pueden pasar datos al dialog
      data: {
        todo
      }
    });

    dialogRef.closed.subscribe((output) => {
      console.log(output);
    }); // se puede subscribir a la funcion closed para obtener el resultado del dialog
  }
}
