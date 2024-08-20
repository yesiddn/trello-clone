import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../utils/validators';
import { RequestStatus } from '../../../../model/request-status.model';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BtnComponent } from '../../../../components/btn/btn.component';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, BtnComponent],
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

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
  errorMessage: string = '';

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      this.errorMessage = '';
      const { name, email, password } = this.form.getRawValue();
      // console.log(name, email, password);

      this.authService.register(name, email, password).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/login']);
        },
        error: (error) => {
          if (error.error.code === 'SQLITE_CONSTRAINT_UNIQUE'){
            this.errorMessage = 'This user already exists.';
          }

          if (Array.isArray(error.error.message)) {
            this.errorMessage = 'Invalid email.';
          }
          this.status = 'failed';
          // console.log(error);
        },
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
