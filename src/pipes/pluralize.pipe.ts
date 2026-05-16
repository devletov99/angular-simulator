import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize',
  standalone: true,
})
export class PluralizePipe implements PipeTransform {

  transform(value: number | string, text: [string, string, string]): string {
    const number: number = Number(value);
    const lastTwo: number = number % 100;
    const lastOne: number = number % 10;

    if (lastTwo >= 11 && lastTwo <= 19) {
      return `${number} ${text[2]}`
    }

    switch (lastOne) {
      case 1:
        return `${ value } ${text[0]}`;
      case 2: 
      case 3: 
      case 4: 
        return `${ value } ${text[1]}`;
      default:
        return `${ value } ${text[2]}`;
    }
  }

}