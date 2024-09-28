import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnComponent } from "../../../../components/btn/btn.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { BoardsService } from '../../../../services/boards.service';
import { Colors } from '../../../../model/colors.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-board-form',
  standalone: true,
  imports: [ReactiveFormsModule, BtnComponent, FontAwesomeModule],
  templateUrl: './new-board-form.component.html'
})
export class NewBoardFormComponent {
  private formBuilder = inject(FormBuilder);
  private boardService = inject(BoardsService);
  private router = inject(Router);

  @Output() closeOverlay = new EventEmitter<boolean>();
  faCheck = faCheck;
  form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    // al Form Control se le pasa el tipo Colors para quqe no se infiera como string y no nos genere errores
    backgroundColor: new FormControl<Colors>('sky', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  doSave() {
    if (this.form.valid) {
      const { title, backgroundColor } = this.form.getRawValue();

      this.boardService.createBoard(title, backgroundColor)
        .subscribe({
          next: (board) => {
            console.log('Board created', board);
            this.closeOverlay.emit(false);
            this.router.navigate(['/app/board', board.id]);
          },
          error: (error) => {
            console.error('Error creating board', error);
          }
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
