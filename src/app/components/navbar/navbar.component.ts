import { Component } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BtnComponent, OverlayModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isOpen = false;
  isWorkspaceOpen = false;
  isRecentOpen = false;
}
