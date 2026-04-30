import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { INavigation } from '../app/assets/interfaces/INavigation';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule, SelectButtonOptionClickEvent } from 'primeng/selectbutton';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import Nora from '@primeuix/themes/nora';
import Lara from '@primeuix/themes/lara';
import Aura from '@primeuix/themes/aura';
import { ThemeService } from '../theme.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IPresetOption } from '../app/assets/interfaces/IPresetOption';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ToggleSwitchModule, FormsModule, SelectButtonModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  destroyRef: DestroyRef = inject(DestroyRef);
  themeService: ThemeService = inject(ThemeService);

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
  ]

}