import { Component } from '@angular/core';
import { BackgroundComponent } from '../../components/background/background.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RecoveryFormComponent } from '../../components/recovery-form/recovery-form.component';
import { BtnComponent } from '../../../../components/btn/btn.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [BackgroundComponent, HeaderComponent, RecoveryFormComponent, BtnComponent, FooterComponent],
  templateUrl: './recovery.component.html'
})
export class RecoveryComponent {

}
