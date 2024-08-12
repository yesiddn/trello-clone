import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose, faCheckToSlot, faBars, faUser, faTag, faCheckSquare, faClock } from '@fortawesome/free-solid-svg-icons';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [FontAwesomeModule, BtnComponent],
  templateUrl: './todo-modal.component.html'
})
export class TodoModalComponent {
  private dialogRef = inject(DialogRef);

  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  close() {
    this.dialogRef.close();
  }
}
