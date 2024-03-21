import { Component, OnInit, inject } from '@angular/core';
import { BOOK } from '../../book';
import { BookSourceService } from './../../services/book-source.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css',
})
export class BookItemComponent implements OnInit {
  dataSource = BOOK;

  // BookFromDatabase: BookItem[] = [];

  constructor(private bookSource: BookSourceService) {}
  // private bookSource = inject(BookSourceService);
  ngOnInit(): void {
    this.dataSource = this.bookSource.getBooks();
  }
}
