import { Injectable } from '@angular/core';
import { BookItem } from './book.entity';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BookServiceService {
  constructor(private http: HttpClient) {}

  bookApi = 'localhost:3000/api/book';

  getBooks(): Observable<BookItem[]> {
    return this.http.get<BookItem[]>(`${this.bookApi}`);
  }
}
