import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../utils/validators';
import { RequestStatus } from '../../../../model/request-status.model';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BtnComponent } from '../../../../components/btn/btn.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, BtnComponent],
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: [CustomValidators.MatchValidator('password', 'confirmPassword')]
  });

  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      console.log(name, email, password);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
