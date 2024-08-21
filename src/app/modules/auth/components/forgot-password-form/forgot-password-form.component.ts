import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestStatus } from '../../../../model/request-status.model';
import { BtnComponent } from '../../../../components/btn/btn.component';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [ReactiveFormsModule, BtnComponent],
  templateUrl: './forgot-password-form.component.html'
})
export class ForgotPasswordFormComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });
  status: RequestStatus = 'init';
  emailSent = false;

  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();

      this.authService.recovery(email).subscribe({
        next: () => {
          this.status = 'success';
          this.emailSent = true;
        },
        error: () => {
          this.status = 'failed';
        },
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
