import { Component, inject } from '@angular/core';
import { BtnComponent } from '../../../../components/btn/btn.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faChevronDown, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { NewBoardFormComponent } from "../new-board-form/new-board-form.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BtnComponent, OverlayModule, FontAwesomeModule, NewBoardFormComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  fabell = faBell
  faInfoCircle = faInfoCircle
  faChevronDown = faChevronDown

  isOpen = false;
  isWorkspaceOpen = false;
  isRecentOpen = false;
  isCreateBoardOpen = false;

  user = this.authService.user;

  // ngOnInit() {
  //   this.authService.profile().subscribe({
  //     next: (user) => {
  //       this.user = user;
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     }
  //   })
  // }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  closeOverlay(event: boolean) {
    this.isCreateBoardOpen = event;
  }
}
