import { Component, inject } from '@angular/core';
import { BtnComponent } from '../../../../components/btn/btn.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faChevronDown, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { NewBoardFormComponent } from "../new-board-form/new-board-form.component";
import { BoardsService } from '../../../../services/boards.service';
import { NAVBAR_BACKGROUND_COLORS } from '../../../../model/colors.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BtnComponent, OverlayModule, FontAwesomeModule, NewBoardFormComponent, NgClass],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private boardService = inject(BoardsService);

  fabell = faBell
  faInfoCircle = faInfoCircle
  faChevronDown = faChevronDown

  isOpen = false;
  isWorkspaceOpen = false;
  isRecentOpen = false;
  isCreateBoardOpen = false;

  user = this.authService.user;
  navBarBackground = this.boardService.backgroundColor;
  navBarColors = NAVBAR_BACKGROUND_COLORS;

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

  get colors() {
    const classes = this.navBarColors[this.navBarBackground()];
    return classes ? classes : this.navBarColors.sky;
  }
}
