import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faPersonWalking, faShield, faTag } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { MessageService } from '../../core/services/message.service';
import { ILocation } from '../../shared/interfaces/ILocation';
import { IDestination } from '../../shared/interfaces/IDestination';
import { IBlog } from '../../shared/interfaces/IBlog';
import { IPhoto } from '../../shared/interfaces/IPhoto';
import { IService } from '../../shared/interfaces/IService';
import { IParticipant } from '../../shared/interfaces/IParticipant';


@Component({
  selector: 'app-home-page',
  imports: [FormsModule, FontAwesomeModule, DatePickerModule, FluidModule, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  messageService: MessageService = inject(MessageService);
  translateService: TranslateService = inject(TranslateService);

  selectedLocation!: boolean;
  selectedParticipant!: boolean;
  selectedDate!: boolean;
  liveInput!: string;
  hoverServiceId!: number | null;
  selectedBlogInfoId: number = 2;
  faStar: IconDefinition = faStar;
  faCalendar: IconDefinition = faCalendar;
  faChevronDown: IconDefinition = faChevronDown;
  date: Date | undefined;

  isFormInValid(): boolean {
    return this.selectedLocation && this.selectedDate && this.selectedParticipant;
  }

  services: IService[] = [
    {
      id: 1,
      icon: faPersonWalking,
      title: 'SERVICES.ITEMS.WALKING.TITLE',
      description: 'SERVICES.ITEMS.WALKING.DESCRIPTION',
    },
    {
      id: 2,
      icon: faShield,
      title: 'SERVICES.ITEMS.SHEILD.TITLE',
      description: 'SERVICES.ITEMS.SHEILD.DESCRIPTION',
    },
    {
      id: 3,
      icon: faTag,
      title: 'SERVICES.ITEMS.TAG.TITLE',
      description: 'SERVICES.ITEMS.TAG.DESCRIPTION',
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
      title: 'DESTINATIONS.ITEMS.LAKE.TITLE',
      subtitle: 'DESTINATIONS.ITEMS.LAKE.SUBTITLE',
      price: 480,
      rating: 4.9,
    },
    {
      id: 2,
      img: 'night-mountain',
      icon: 'asterisk-icon',
      title: 'DESTINATIONS.ITEMS.NIGHT.TITLE',
      subtitle: 'DESTINATIONS.ITEMS.NIGHT.SUBTITLE',
      price: 500,
      rating: 4.5,
    },
    {
      id: 3,
      img: 'sport-mountain',
      icon: 'asterisk-icon',
      title: 'DESTINATIONS.ITEMS.SPORT.TITLE',
      subtitle: 'DESTINATIONS.ITEMS.SPORT.SUBTITLE',
      price: 230,
      rating: 5.0,
    },
  ];

  travels: IBlog[] = [
    {
      id: 1,
      img: 'italy-coast',
      title: 'BLOG.ITEMS.ITALY.TITLE',
      description:'BLOG.ITEMS.ITALY.DESCRIPTION',
      date: '01/04/2023',
    },
    {
      id: 2,
      img: 'airplane-sunset',
      title: 'BLOG.ITEMS.DOUBTS.TITLE',
      description: 'BLOG.ITEMS.DOUBTS.DESCRIPTION',
      date: '01/04/2023',
    },
    {
      id: 3,
      img: 'solo-travel',
      title: 'BLOG.ITEMS.SOLO.TITLE',
      description: 'BLOG.ITEMS.SOLO.DESCRIPTION',
      date: '01/04/2023',
    },
    {
      id: 4,
      img: 'india-travel',
      title: 'BLOG.ITEMS.INDIA.TITLE',
      description: 'BLOG.ITEMS.INDIA.DESCRIPTION',
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
