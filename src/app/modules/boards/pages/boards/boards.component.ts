import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown, faAngleUp, faBorderAll, faBox, faClock, faGear, faHeart, faUsers, faWaveSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { MeService } from '../../../../services/me.service';
import { Board } from '../../../../model/board.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [NavbarComponent, FontAwesomeModule, CdkAccordionModule, RouterLink],
  templateUrl: './boards.component.html',
})
export class BoardsComponent {
  private meService = inject(MeService);

  faBox = faBox;
  faTrello = faTrello;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  accordionMenuIsExpanded = false;

  items = [
    {
      label: 'Item 1',
      items: [
        {
          label: 'Item 1.1',
        },
        { label: 'Item 1.2' },
      ],
    },
    {
      label: 'Item 2',
      items: [
        {
          label: 'Item 2.1',
        },
      ],
    },
    {
      label: 'Item 3',
      items: [
        {
          label: 'Item 3.1',
        },
        { label: 'Item 3.2' },
      ],
    },
  ];

  boards: Board[] = [];

  getMeBoards() {
    this.meService.getMeBoards().subscribe({
      next: (boards) => {
        this.boards = boards;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  ngOnInit() {
    this.getMeBoards();
  }
}
