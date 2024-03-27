import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { ProductCartAddEvent } from '../../components/product-card/product-card.component';
import { CartSourceService } from '../../services/cart-source/cart-source.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  protected updateQueryParams$ = new ReplaySubject<ProductFilters>();

  products$ = this.activatedRoute.params.pipe(
    map(({ id }) => id),
    switchMap((id) => this.productSrv.getById(id))
  );

  protected destroyed$ = new Subject<void>();

  constructor(
    protected productSrv: ProductService,
    protected cartSrv: CartSourceService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  quantity: number = 1;
  getDiscountAmount(item: Product): string | number {
    return getDiscountAmount(item.netPrice, item.discount) * this.quantity;
  }

  onAdd(id: string) {
    if (this.quantity > 0) {
      console.log(this.quantity, id);
      // this.addProduct.emit({ id: id, quantity: this.quantity });
      this.cartSrv.add(id, this.quantity);
    }
  }
}
