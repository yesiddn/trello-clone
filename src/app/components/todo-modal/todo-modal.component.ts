import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose, faCheckToSlot, faBars, faUser, faTag, faCheckSquare, faClock } from '@fortawesome/free-solid-svg-icons';
import { BtnComponent } from '../btn/btn.component';
import { ToDo } from '../../model/todo.model';
import { Card } from '../../model/card.model';

interface InputData {
  // todo: ToDo;
  card: Card;
}

interface OutputData {
  isEdit: boolean;
}

@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [FontAwesomeModule, BtnComponent],
  templateUrl: './todo-modal.component.html'
})
export class TodoModalComponent {
  private dialogRef = inject(DialogRef<OutputData>); // a DialogRef se le puede pasar un tipo de dato para que sepa que tipo de datos se van a retornar
  private data: InputData = inject(DIALOG_DATA); // a DIALOG_DATA se le puede pasar un tipo de dato para que sepa que tipo de datos se van a recibir

  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  // todo: ToDo = this.data.todo; // se puede recibir el id del todo y buscarlo en una api para obtener mas informacion
  card: Card = this.data.card;

  close() {
    this.dialogRef.close({
      isEdit: false
    });
  }
}
