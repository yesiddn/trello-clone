import { Component, inject } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { Column, ToDo } from '../../../../model/todo.model';
import { TodoModalComponent as CardModalComponent } from '../../../../components/todo-modal/todo-modal.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { BoardsService } from '../../../../services/boards.service';
import { Board } from '../../../../model/board.model';
import { Card } from '../../../../model/card.model';
import { CardsService } from '../../../../services/cards.service';
import { BtnComponent } from '../../../../components/btn/btn.component';
import { List } from '../../../../model/list.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ListsService } from '../../../../services/lists.service';
import { BACKGROUND_COLORS } from '../../../../model/colors.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NavbarComponent, BtnComponent, ReactiveFormsModule, CdkDrag, CdkDropList, CdkDropListGroup, FontAwesomeModule, NgClass],
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
  private route = inject(ActivatedRoute);
  private boardService = inject(BoardsService);
  private cardService = inject(CardsService);
  private listsService = inject(ListsService);

  board: Board | null = null;
  inputCard = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required]
  });
  inputList = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required]
  });
  showListForm = false;
  faClose = faClose;
  backgroundColors = BACKGROUND_COLORS;
  // columns: Column[] = [
  //   {
  //     title: 'To Do',
  //     todos: [
  //       {
  //         id: '1',
  //         title: 'Task 1'
  //       },
  //       {
  //         id: '2',
  //         title: 'Buy a unicorn'
  //       },
  //       {
  //         id: '3',
  //         title: 'Sell a oven'
  //       }
  //     ]
  //   },
  //   {
  //     title: 'Doing',
  //     todos: [
  //       {
  //         id: '4',
  //         title: 'Task 4'
  //       }
  //     ]
  //   },
  //   {
  //     title: 'Done',
  //     todos: []
  //   }
  // ];

  todos: ToDo[] = [];
  doing: ToDo[] = [];
  done: ToDo[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.getBoard(id);
        }
      }
    });
  }

  ngOnDestroy() {
    this.boardService.setBackgroudColor('sky');
  }

  // drop(event: CdkDragDrop<ToDo[]>) {
  drop(event: CdkDragDrop<Card[]>) {
    // el evento contiene informacion sobre el item que se esta moviendo -> en especial el previousIndex y el currentIndex
    // console.log(event);

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

    const position = this.boardService.getPosition(event.container.data, event.currentIndex);
    const card = event.container.data[event.currentIndex];
    const listId = event.container.id

    // console.log('list id:', listId); // cdk-drop-list-1 -> se asigna ese id automaticamente
    this.updateCard(card, position, listId);
  }

  addList() {
    // this.columns.push({
    //   title: 'New Column',
    //   todos: []
    // });

    const title = this.inputList.value;
    if (this.board) {
      this.listsService.create({
        title,
        boardId: this.board.id,
        position: this.boardService.getPostionNewItem(this.board.lists)
      })
        .subscribe({
          next: (list) => {
            this.board?.lists.push({
              ...list,
              cards: [],
            });
            this.showListForm = false;
            this.inputList.setValue('');
          }
        });
    }
  }

  // openDialog(todo: ToDo) {
  openDialog(card: Card) {
    const dialogRef = this.dialog.open(CardModalComponent, {
      minWidth: '250px',
      maxWidth: '50%',
      // autoFocus: true
      // con data se pueden pasar datos al dialog
      data: {
        card
      }
    });

    dialogRef.closed.subscribe((output) => {
      console.log(output);
    }); // se puede subscribir a la funcion closed para obtener el resultado del dialog
  }

  private getBoard(id: string) {
    this.boardService.getBoard(id).subscribe({
      next: (board) => {
        this.board = board;
        this.boardService.setBackgroudColor(this.board?.backgroundColor || 'sky'); // se puede setear desde aqui o desde el servicio
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  private updateCard(card: Card, position: number, listId: string) {
    this.cardService.update(card.id, { position, listId })
    .subscribe({
      next: (updatedCard) => {
        console.log(updatedCard);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  openFormCard(list: List) {
    if (this.board?.lists) {
      this.board.lists = this.board.lists.map((l) => ({
        ...l,
        showCardForm: l.id === list.id
      }));
    }
  }

  createCard(list: List) {
    const title = this.inputCard.value;

    if (this.board) {
      this.cardService.create({
        title,
        listId: list.id,
        boardId: this.board.id,
        position: this.boardService.getPostionNewItem(list.cards)
      })
        .subscribe({
          next: (card) => {
            list.cards.push(card);
            this.inputCard.setValue('');
            list.showCardForm = false;
          },
          error: (error) => {
            console.error(error);
          }
        });
    }
  }

  closeFormCard(list: List) {
    list.showCardForm = false;
  }

  get colors() {
    if (this.board) {
      const classes = this.backgroundColors[this.board.backgroundColor];
      return classes ? classes : {};
    }

    return {};
  }
}
