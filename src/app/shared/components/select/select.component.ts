import { Component, effect, input, output, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ISelectOption } from '../../interfaces/ISelectOption';
import { Observable } from 'rxjs';
import { IProductCategory } from '../../../features/products/interfaces/IProductCategory';

@Component({
  selector: 'app-select',
  imports: [SelectModule, TagModule, FormsModule],
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
