import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule, SelectButtonOptionClickEvent } from 'primeng/selectbutton';
import { AsyncPipe } from '@angular/common';
import { INavigation } from '../../interfaces/INavigation';
import { AuthService } from '../../features/auth/services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ToggleSwitchModule,
    FormsModule,
    SelectButtonModule,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);
  authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  companyName: string = 'румтибет';
  currentDate: Date = new Date();
  isCounterVisible!: boolean;
  counter: number = 0;

  constructor() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  onToggleMode(value: boolean): void {
    this.themeService.setMode(value);
  }

  onPresetSelect(event: SelectButtonOptionClickEvent): void {
    this.themeService.setPreset(event.option.value);
  }

  incrementCounter(): void {
    this.counter++;
  }

  decreaseCounter(): void {
    this.counter--;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
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
      link: '/user-page',
    },
  ];

}
