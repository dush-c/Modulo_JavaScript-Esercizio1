import { Injectable } from '@angular/core';
import { BOOK } from '../book';

@Injectable({
  providedIn: 'root',
})
export class BookSourceService {
  constructor() {}

  getBooks() {
    return [...BOOK];
  }
}
