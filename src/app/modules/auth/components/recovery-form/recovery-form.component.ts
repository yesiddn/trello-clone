import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../utils/validators';
import { RequestStatus } from '../../../../model/request-status.model';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BtnComponent } from '../../../../components/btn/btn.component';

@Component({
  selector: 'app-recovery-form',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, BtnComponent],
  templateUrl: './recovery-form.component.html'
})
export class RecoveryFormComponent {
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.nonNullable.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('newPassword', 'confirmPassword'),
      ],
    }
  );

  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;

  recovery() {
    if (this.form.valid) {
      // Todo
    } else {
      this.form.markAllAsTouched();
    }
  }
}
