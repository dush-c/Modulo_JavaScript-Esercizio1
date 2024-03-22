import { Component, Input } from '@angular/core';
import { Product } from '../../entities/product.entity';
import { getDiscountAmount } from '../../cart-utils';
import {
  ReplaySubject,
  Subject,
  debounceTime,
  map,
  switchMap,
  takeUntil,
} from 'rxjs';
import {
  ProductFilters,
  ProductService,
} from '../../services/product/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { omitBy, isNil } from 'lodash';
import { CartSourceService } from '../../services/cart-source/cart-source.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  @Input()
  product: Product | undefined;

  protected updateQueryParams$ = new ReplaySubject<ProductFilters>();

  products$ = this.activatedRoute.params.pipe(
    map(({ id }) => id),
    switchMap((id) => this.productSrv.getById(id))
  );

  protected destroyed$ = new Subject<void>();

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
        map((filters) => omitBy(filters, (val) => val === '')),
        debounceTime(150)
      )
      .subscribe((filters) => {
        this.router.navigate([], { queryParams: filters });
      });

    this.activatedRoute.data.subscribe((data) => console.log(data));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  quantity: number = 1;
  getDiscountAmount(item: Product): string | number {
    return getDiscountAmount(item.netPrice, item.discount) * this.quantity;
  }
}
