import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import './collection';
import { FormsModule } from '@angular/forms';
import { ILocation } from './assets/interfaces/location';
import { IService } from './assets/interfaces/service';
import { IParticipant } from './assets/interfaces/participant';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName: string = 'румтибет';
  selectedLocation!: string;
  selectedParticipant!: string;
  selectedDate!: string;
  currentDate: Date = new Date();
  isCounterVisible: boolean = false;
  counter: number = 0;
  liveInput!: string;
  isDownload: boolean = true;
  hoverServiceId!: number | null;

  services: IService[] = [
    {
      id: 1,
      img: 'leadership-icon',
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 2,
      img: 'security-icon',
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 3,
      img: 'price-icon',
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    }
  ];

  locations: ILocation[] = [
    {
      id: 1,
      name: 'Эльбрус',
    },
    {
      id: 2,
      name: 'Домбай',
    },
    {
      id: 3,
      name: 'Архыз',
    },
    {
      id: 4,
      name: 'Камчатка',
    },
    {
      id: 5,
      name: 'Дигория',
    },
    {
      id: 6,
      name: 'Алтай',
    }
  ];

  participants: IParticipant[] = [
    {
      id: 1,
      quantity: '1-2',
    },
    {
      id: 2,
      quantity: '3-4',
    },
    {
      id: 3,
      quantity: '5-6',
    },
    {
      id: 4,
      quantity: '7-8',
    },
    {
      id: 5,
      quantity: '9-10',
    },
  ];

  constructor() {
    this.saveLastVisit();
    this.saveQuantityVisit();

    setInterval(() => {
      this.currentDate = new Date();
    },1000);
    

    setTimeout(() => {
      this.isDownload = false;
    }, 2000);
  }
  
  isMainColor(color: Color): boolean {
    const rgbColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return rgbColors.includes(color);
  }

  saveLastVisit(): void {
    const lastVisitTime: Date = new Date();
    localStorage.setItem('time', JSON.stringify(lastVisitTime));
  }

  saveQuantityVisit(): void {
    const gatVisit: string | null = localStorage.getItem('visit');
    const visitNumber: number = Number(gatVisit || 0) + 1;
    localStorage.setItem('visit', String(visitNumber));
  }

  isFormValid(): boolean {
    return !this.selectedLocation || !this.selectedDate || !this.selectedParticipant;
  }
  
  incrementCounter(): void {
    this.counter++;
  }

  decreaseCounter(): void {
    this.counter--;
  }

};