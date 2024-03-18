import { Component } from '@angular/core';
import { BookSourceService } from './services/book-source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Book_Directory';

  items = this.bookSource;
  constructor(private bookSource: BookSourceService) {}
}
