import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  companyName: String = 'румтибет';

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

  constructor() {
    this.saveLastVisit();
    this.saveQuantityVisit();
  }
};