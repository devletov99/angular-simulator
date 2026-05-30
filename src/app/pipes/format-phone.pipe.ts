import { Pipe, PipeTransform } from '@angular/core';
import { PhoneFormat } from '../enums/PhoneFormat';

@Pipe({
  name: 'formatPhone',
})
export class FormatPhonePipe implements PipeTransform {

  transform(value: string, form: PhoneFormat): string {
    const phoneRegex: RegExp = /(\d+?)(\d{3})(\d{3})(\d{2})(\d{2})$/;
    const tel: string = value.replace(/\D/g, '');
    
    switch (form) {
      case PhoneFormat.COMPACT: 
        return `+${ tel }`
      case PhoneFormat.INTERNATIONAL: 
        return tel.replace(phoneRegex, '+$1 $2 $3 $4 $5');
      case PhoneFormat.NATIONAL:
        return tel.replace(phoneRegex, '$2 $3 $4 $5');;
      case PhoneFormat.MASKED:
        return tel.replace(phoneRegex, '+$1 $2 *** ** $5');
      default: 
        return value;
    }
  }

}