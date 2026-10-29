import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { QuoteStore } from '../../state/quote.store';
import { QuoteFilter } from '../../enums/QuoteFilter';

@Component({
  selector: 'app-quote',
  imports: [],
  providers: [QuoteStore],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteComponent implements OnInit {

  store = inject(QuoteStore);
  quoteFilter = QuoteFilter;

  ngOnInit(): void {
    this.store.loadQuotes();
  }

}
