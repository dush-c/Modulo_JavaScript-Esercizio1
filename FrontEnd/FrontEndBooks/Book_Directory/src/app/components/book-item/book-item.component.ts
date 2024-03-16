import { Component, OnInit } from '@angular/core';
import { BOOK } from '../../book';
import { BookItem } from '../../book.entity';
import { BookServiceService } from '../../book-service.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css',
})
export class BookItemComponent implements OnInit {
  dataSource = BOOK;

  BookFromDatabase: BookItem[] = [];

  constructor(private bookService: BookServiceService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.BookFromDatabase = books;
    });
  }
}
