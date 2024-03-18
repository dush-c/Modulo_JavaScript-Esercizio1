import { Component, OnInit, inject } from '@angular/core';
import { BOOK } from '../../book';
import { BookItem } from '../../book.entity';
import { BookSourceService } from './../../services/book-source.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css',
})
export class BookItemComponent {
  dataSource = BOOK;

  // BookFromDatabase: BookItem[] = [];

  // constructor(private bookSource: BookSourceService) {
  //   this.BookFromDatabase = this.bookSource.getBooks();
  // }
  private bookSource = inject(BookSourceService);
}
