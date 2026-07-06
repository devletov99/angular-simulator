import { Component, inject } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageComponent } from './components/message/message.component';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MessageComponent, LoaderComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [LocalStorageService],
})
export class AppComponent {

  localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    this.localStorageService.setValue('time', new Date());
    this.localStorageService.getValue('time');
    this.localStorageService.removeElement('time');

    const gatVisit: string | null = localStorage.getItem('visit');
    const visitNumber: number = Number(gatVisit || 0) + 1;

    this.localStorageService.setValue('visit', visitNumber);
  }

  saveLastVisit(): void {
    const lastVisitTime: Date = new Date();
    localStorage.setItem('time', JSON.stringify(lastVisitTime));
  }

  saveQuantityVisit(): void {
    const gatVisit: string | null = this.localStorageService.getValue('visit');
    const visitNumber: number = Number(gatVisit || 0) + 1;
    this.localStorageService.setValue('visit', visitNumber);
  }

}
