import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBox, faClock, faWaveSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [NavbarComponent, FontAwesomeModule],
  templateUrl: './boards.component.html'
})
export class BoardsComponent {
  faBox = faBox;
  faTrello = faTrello;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
}
