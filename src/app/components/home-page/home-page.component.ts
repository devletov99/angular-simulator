import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faPersonWalking, faShield, faTag } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { IBlog } from '../../interfaces/IBlog';
import { IDestination } from '../../interfaces/IDestination';
import { ILocation } from '../../interfaces/ILocation';
import { IParticipant } from '../../interfaces/IParticipant';
import { IPhoto } from '../../interfaces/IPhoto';
import { IService } from '../../interfaces/IService';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  messageService: MessageService = inject(MessageService);

  selectedLocation!: boolean;
  selectedParticipant!: boolean;
  selectedDate!: boolean;
  liveInput!: string;
  hoverServiceId!: number | null;
  selectedBlogInfoId: number = 2;
  faStar: IconDefinition = faStar;
  faCalendar: IconDefinition = faCalendar;
  faChevronDown: IconDefinition = faChevronDown;

  isFormInValid(): boolean {
    return this.selectedLocation && this.selectedDate && this.selectedParticipant;
  }

  services: IService[] = [
    {
      id: 1,
      icon: faPersonWalking,
      title: 'Опытный гид',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 2,
      icon: faShield,
      title: 'Безопасный поход',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 3,
      icon: faTag,
      title: 'Лояльные цены',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
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
    },
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
  ];

  travels: IBlog[] = [
    {
      id: 1,
      img: 'italy-coast',
      title: 'Красивая Италия, какая она в реальности?',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
    },
    {
      id: 2,
      img: 'airplane-sunset',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
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
  ];

  photoreports: IPhoto[] = [
    {
      id: 1,
      img: 'cappadocia',
    },
    {
      id: 2,
      img: 'travel-planning',
    },
    {
      id: 3,
      img: 'skyline-burj',
    },
    {
      id: 4,
      img: 'tropical-beach',
    },
    {
      id: 5,
      img: 'canyon',
    },
    {
      id: 6,
      img: 'vintage-travel',
    },
  ];

}
