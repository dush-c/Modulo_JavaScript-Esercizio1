import { Component, OnInit } from '@angular/core';
import { CART } from './cart';
import { getVAT } from './cart-utils';
import { CartItem } from './cart-item.entity';
import { CartSourceService } from './services/cart-source/cart-source.service';
import { __values } from 'tslib';
import { VatService } from './services/vat-/vat-.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  items$ = this.cartSrv.items$;

  vat$ = this.vatSrv.value$;

  constructor(
    protected cartSrv: CartSourceService,
    protected vatSrv: VatService
  ) {}
  ngOnInit(): void {
    this.vatSrv.getVat('IT');
  }
  //protected cartSrv = inject(CartSourceService);

  trackById(_: number, item: CartItem) {
    return item.id;
  }

  changeQuantity(item: CartItem, newQuantity: number) {
    this.cartSrv.setQuantity(item.id, newQuantity);
  }
}
