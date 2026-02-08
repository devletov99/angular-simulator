import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import './collection';
import { FormsModule } from '@angular/forms';

interface iService {
  hover: boolean;
  id: number;
  img: string;
  title: string;
  description: string;
}

interface iLocation {
  id: number;
  location: string;
}

interface iParticipant {
  id: number;
  participant: string;
}

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
  inputDate!: string;
  selectedDate: Date = new Date();
  isCounterVisible: boolean = false;
  counter: number = 0;
  liveInput!: string;
  isPageVisible: boolean = true;

  services: iService[] = [
    {
      hover: false,
      id: 1,
      img: 'leadership-icon',
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
       hover: false,
      id: 2,
      img: 'security-icon',
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      hover: false,
      id: 3,
      img: 'price-icon',
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    }
  ];

  locations: iLocation[] = [
    {
      id: 1,
      location: 'Эльбрус',
    },
    {
      id: 2,
      location: 'Домбай',
    },
    {
      id: 3,
      location: 'Архыз',
    },
    {
      id: 4,
      location: 'Камчатка',
    },
    {
      id: 5,
      location: 'Дигория',
    },
    {
      id: 6,
      location: 'Алтай',
    }
  ];

  participants: iParticipant[] = [
    {
      id: 1,
      participant: '1-2',
    },
    {
      id: 2,
      participant: '3-4',
    },
    {
      id: 3,
      participant: '5-6',
    },
    {
      id: 4,
      participant: '7-8',
    },
    {
      id: 5,
      participant: '9-10',
    },
  ];

  constructor() {
    this.saveLastVisit();
    this.saveQuantityVisit();

    setInterval(() => {
      this.selectedDate = new Date();
    },1000);
    

    setTimeout(() =>{
      this.isPageVisible = false;
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
    return !this.selectedLocation || !this.inputDate || !this.selectedParticipant;
  }
  
  onClickIncrease(): void {
    this.counter++;
  }

  onClickDecrease(): void {
    this.counter--;
  }

};