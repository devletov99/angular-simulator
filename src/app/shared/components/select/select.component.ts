import { Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ISelectOption } from '../../interfaces/ISelectOption';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-select',
  imports: [SelectModule, TagModule, FormsModule, TranslatePipe],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {

  options = input<ISelectOption[]>([]);
  placeholder = input('');

  selectChange = output<SelectChangeEvent>();

  constructor() {
    effect(() => console.log(this.options()));
  }

}
