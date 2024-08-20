import { Component } from '@angular/core';
import { BackgroundComponent } from '../../components/background/background.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BackgroundComponent, LoginFormComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {

}
