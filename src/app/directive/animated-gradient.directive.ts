import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[animatedGradient]',
})
export class AnimatedGradientDirective {

  @Input() gradientConfiguration!: IAnimatedGradientConfig;

  private timer!: number;

  ngOnInit(): void {
    if (this.gradientConfiguration.colors) {
      this.background = `linear-gradient(white, white) padding-box, linear-gradient(90deg, ${ this.gradientConfiguration.colors.join(', ') }) border-box`;
    }

    if (this.gradientConfiguration.thickness != null) {
      this.border = `${ this.gradientConfiguration.thickness }px solid transparent`;
    }
  }
  
  @HostBinding('class.gradient-border') isActive: boolean = false;
  @HostBinding('style.background') background!: string;
  @HostBinding('style.border') border!: string;

  @HostListener('mouseenter') 
    onEvent() {
      this.timer = setTimeout(() => {
        this.isActive = true;
      }, this.gradientConfiguration.delay || 1000);
    }

  @HostListener('mouseleave') 
    onLeave() {
      clearTimeout(this.timer);
      this.isActive = false;
    }

} 