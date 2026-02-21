import { Component, inject } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import './collection';
import { FormsModule } from '@angular/forms';
import { ILocation } from './assets/interfaces/ILocation';
import { IService } from './assets/interfaces/IService';
import { IParticipant } from './assets/interfaces/IParticipant';
import { IDestination } from './assets/interfaces/IDestination';
import { IBlog } from './assets/interfaces/IBlog';
import { MessageService } from '../message.service';
import { Message } from '../enums/Message';
import { NgTemplateOutlet } from '@angular/common';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService, LocalStorageService],
})
export class AppComponent {

  companyName: string = 'румтибет';
  selectedLocation!: boolean;
  selectedParticipant!: boolean;
  selectedDate!: boolean;
  currentDate: Date = new Date();
  isCounterVisible!: boolean;
  counter: number = 0;
  liveInput!: string;
  isDownload: boolean = true;
  hoverServiceId!: number | null;
  selectedBlogInfoId: number = 2;
  messageService: MessageService = inject(MessageService);
  Message = Message;
  localService: LocalStorageService = inject(LocalStorageService);
   
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

  destinations: IDestination[] = [
    {
      id: 1,
      img: 'lake-mountains',
      icon: 'asterisk-icon',
      title: 'Озеро возле гор',
      subtitle: 'романтическое приключение',
      price: 480,
      rating: 4.9,
    },
    {
      id: 2,
      img: 'night-mountain',
      icon: 'asterisk-icon',
      title: 'Ночь в горах',
      subtitle: 'в компании друзей',
      price: 500,
      rating: 4.5,
    },
    {
      id: 3,
      img: 'sport-mountain',
      icon: 'asterisk-icon',
      title: 'Спорт в горах',
      subtitle: 'для тех, кто забоится о себе',
      price: 230,
      rating: 5.0,
    },
  ]

  travels: IBlog[] = [
    {
      id: 1,
      img: 'italy-coast',
      title: 'Красивая Италия, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
    },
    {
      id: 2,
      img: 'airplane-sunset',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023',
    },
    {
      id: 3,
      img: 'solo-travel',
      title: 'Как подготовиться к путешествию в одиночку? ',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
    },
    {
      id: 4,
      img: 'india-travel',
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023',
    },
  ]

  constructor() {
    this.localService.setValue('time', new Date());
    this.localService.getValue('time');
    this.localService.removeElement('time');
   
    const gatVisit: string | null = localStorage.getItem('visit');
    const visitNumber: number = Number(gatVisit || 0) + 1;

    this.localService.setValue('visit', visitNumber);

    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    
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

  isFormInValid(): boolean {
    return this.selectedLocation && this.selectedDate && this.selectedParticipant;
  }
  
  incrementCounter(): void {
    this.counter++;
  }

  decreaseCounter(): void {
    this.counter--;
  }

};