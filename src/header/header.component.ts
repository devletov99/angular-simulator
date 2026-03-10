import { Component } from '@angular/core';
import { INavigation } from '../app/assets/interfaces/INavigation';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  
  companyName: string = 'румтибет';
  currentDate: Date = new Date();
  isCounterVisible!: boolean;
  counter: number = 0;

  constructor() {

    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  incrementCounter(): void {
  this.counter++;
  }

  decreaseCounter(): void {
    this.counter--;
  }

  navigations: INavigation[] = [
    {
      id: 1,
      text: 'Главная',
      link: '/',
    },
    {
      id: 2,
      text: 'Пользователи',
      link: '/user-page'
    },
  ]

}