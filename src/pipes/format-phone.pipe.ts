import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhone',
})
export class FormatPhonePipe implements PipeTransform {

  transform(value: string, form: string): string {
    const phoneRegex: RegExp = /(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/;
    const tel: string = value.replace(/\D/g, '');
    
    switch (form) {
      case 'compact': 
        return `+${tel}`
      case 'international': 
        return tel.replace(phoneRegex, '+$1 $2 $3 $4 $5');
      case 'national':
        return tel.replace(phoneRegex, '$2 $3 $4 $5');;
      case 'masked':
        return tel.replace(phoneRegex, '+$1 $2 *** ** $5');
      default: 
        return value;
    }
  }

}