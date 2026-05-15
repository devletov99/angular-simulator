import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBold]',
})
export class AddBoldDirective {

  @HostBinding('style.font-weight') fontWeight: string = 'normal'

  @HostListener('mouseenter')
  onEvent(): void {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.fontWeight = 'normal';
  }

}