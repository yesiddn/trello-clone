import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash, faPen } from '@fortawesome/free-solid-svg-icons';
import { BtnComponent } from '../../../../components/btn/btn.component';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { RequestStatus } from '../../../../model/request-status.model';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [BtnComponent, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  }); // Crea un formulario con los campos email y password

  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();

      this.authService.login(email, password).subscribe({
        next: () => {
          this.status = 'success';
          // redirigir a /app
          this.router.navigate(['/app']);
        },
        error: () => {
          this.status = 'failed';
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
