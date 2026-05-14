import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize',
  standalone: true,
})
export class PluralizePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 1:
        return `${ value } пользователь`;
      case 2: 
        return `${ value } пользователя`;
      default:
        return `${ value } пользователей`;
    }
  }

}