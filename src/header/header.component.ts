import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { INavigation } from '../app/assets/interfaces/INavigation';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule, SelectButtonOptionClickEvent } from 'primeng/selectbutton';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { IPaymentOptions } from '../app/assets/interfaces/IPaymentOptions';
import Nora from '@primeuix/themes/nora';
import Lara from '@primeuix/themes/lara';
import Aura from '@primeuix/themes/aura';
import { ThemeService } from '../theme.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ToggleSwitchModule, FormsModule, SelectButtonModule, NgTemplateOutlet, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {

  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  destroyRef: DestroyRef = inject(DestroyRef);
  themeService: ThemeService = inject(ThemeService);

  companyName: string = 'румтибет';
  currentDate: Date = new Date();
  isCounterVisible!: boolean;
  counter: number = 0;
  value!: number;
  private element: HTMLElement = document.documentElement;
  
  constructor() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  ngOnInit() {
     this.themeService.mode$.pipe(
      tap((value: boolean) => this.element.classList.toggle('dark', value)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  onSubmitToggle(value: boolean): void {
    this.themeService.setMode(value);
  }

  onPaymentSelect(event: SelectButtonOptionClickEvent): void {
    this.themeService.setPreset(event.option.value);
    this.themeService.updatePrime();
    console.log(this.themeService.getPreset())
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

  paymentOptions: IPaymentOptions[] = [
    { 
      name: "Aura",  
      value: Aura 
    },
    { 
      name: "Lara",  
      value: Lara 
    },
    { 
      name: "Nora",  
      value: Nora 
    }
  ]

}