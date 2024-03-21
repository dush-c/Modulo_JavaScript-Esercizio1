import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ProductFilters,
  ProductService,
} from '../../services/product/product.service';
import {
  ReplaySubject,
  Subject,
  debounceTime,
  map,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { isNil, omitBy } from 'lodash';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  protected updateQueryParams$ = new ReplaySubject<ProductFilters>();

  protected destroyed$ = new Subject<void>();

  filters$ = this.activatedRoute.data.pipe(
    map(({ filters }) => filters as ProductFilters)
  );

  products$ = this.filters$.pipe(
    startWith<ProductFilters>({}),
    debounceTime(150),
    switchMap((filters) => {
      return this.productSrv.list(filters);
    })
  );

  constructor(
    protected productSrv: ProductService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.updateQueryParams$
      .pipe(
        takeUntil(this.destroyed$),
        map((filters) => omitBy(filters, isNil)),
        map((filters) => omitBy(filters, (val) => val === ''))
      )
      .subscribe((filters) => {
        this.router.navigate([], { queryParams: filters });
      });

    this.activatedRoute.queryParams.subscribe((val) => console.log(val));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  applyFilters(value: ProductFilters) {
    this.updateQueryParams$.next(value);
  }
}
