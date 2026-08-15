import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { SelectButtonChangeEvent, SelectButtonModule, SelectButtonOptionClickEvent } from 'primeng/selectbutton';
import { AsyncPipe, DatePipe } from '@angular/common';
import { INavigation } from '../../interfaces/INavigation';
import { AuthService } from '../../features/auth/services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { APP_CONFIG } from '../../app.token';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';

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
    DatePipe,
    TranslatePipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private config = inject(APP_CONFIG);
  themeService: ThemeService = inject(ThemeService);
  languageService = inject(LanguageService);

  companyName: string = this.config.companyName;
  currentDate: Date = new Date();
  isCounterVisible!: boolean;
  counter: number = 0;
  loginDate = this.authService.getLoginTime();

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

  onLangSelect(event: SelectButtonChangeEvent): void {
    this.languageService.changeLanguage(event.value);
  }

  navigations: INavigation[] = [
    {
      id: 1,
      text: 'NAV.MAIN',
      link: '/',
    },
    {
      id: 2,
      text: 'NAV.USERS',
      link: '/user-page',
    },
  ];

}
