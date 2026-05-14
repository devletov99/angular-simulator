import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appAddBold]',
})
export class AddBoldDirective {

  @HostBinding('style.font-weight') fontWeight: string = 'normal'

  @HostListener('mouseenter')
  onEvent() {
    this.fontWeight = 'bold';
  }
  @HostListener('mouseleave')
  onLeave() {
    this.fontWeight = 'normal';
  }

}