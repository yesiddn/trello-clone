import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BtnComponent } from "../../../../components/btn/btn.component";

@Component({
  selector: 'app-new-board-form',
  standalone: true,
  imports: [ReactiveFormsModule, BtnComponent],
  templateUrl: './new-board-form.component.html'
})
export class NewBoardFormComponent {
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    title: [''],
    backgroundColor: ['']
  });

  doSave() {
    if (this.form.valid) {
      const { title, backgroundColor } = this.form.getRawValue();
      console.log(title, backgroundColor);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
