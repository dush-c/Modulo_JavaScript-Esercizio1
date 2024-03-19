import { Component, OnDestroy, OnInit } from '@angular/core';
import { CART } from './cart';
import { getVAT } from './cart-utils';
import { CartItem } from './entities/cart-item.entity';
import { CartSourceService } from './services/cart-source/cart-source.service';
import { __values } from 'tslib';
import { VatService } from './services/vat-/vat-.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  items$ = this.cartSrv.items$;

  vat$ = this.vatSrv.value$;

  private updateQuantity$ = new Subject<{ id: string; quantity: number }>();
  private destroyed$ = new Subject<void>();
  constructor(
    protected cartSrv: CartSourceService,
    protected vatSrv: VatService
  ) {}
  ngOnInit(): void {
    this.vatSrv.getVat('IT');

    this.updateQuantity$
      .pipe(debounceTime(150), takeUntil(this.destroyed$))
      .subscribe(({ id, quantity }) => {
        this.cartSrv.setQuantity(id, quantity);
      });
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  //protected cartSrv = inject(CartSourceService);

  trackById(_: number, item: CartItem) {
    return item.id;
  }

  changeQuantity(item: CartItem, newQuantity: number) {
    this.updateQuantity$.next({ id: item.id, quantity: newQuantity });
  }
}
