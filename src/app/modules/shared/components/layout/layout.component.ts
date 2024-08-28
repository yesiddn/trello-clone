import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
  private authService = inject(AuthService);

  ngOnInit() {
    // de esta forma solo se hace una petición al servidor para obtener la información del usuario
    this.authService.profile().subscribe();
  }
}
