import { TestBed } from '@angular/core/testing';

import { BookSourceService } from './book-source.service';

describe('BookSourceService', () => {
  let service: BookSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
