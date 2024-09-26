import { Component } from '@angular/core';
import { BackgroundComponent } from '../../components/background/background.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [BackgroundComponent, NavbarComponent, HeaderComponent, FooterComponent, RegisterFormComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

}
