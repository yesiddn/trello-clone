import { Component } from '@angular/core';
import { BackgroundComponent } from '../../components/background/background.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ BackgroundComponent, LoginFormComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {

}
