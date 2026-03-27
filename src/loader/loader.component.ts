import { Component, inject } from '@angular/core';
import { LoaderService } from '../loader.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {

  private loaderService: LoaderService = inject(LoaderService);
  loader$: Observable<boolean> = this.loaderService.loader$;

}