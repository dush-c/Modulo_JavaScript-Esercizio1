import { Component } from '@angular/core';
import { CART } from './cart';
import {
  getDiscountAmount,
  getDiscountedPrice,
  getPrice,
  getVAT,
  parseItem,
} from './cart-utils';
import { CartItem } from './cart-item.entity';
import { CartSourceService } from './services/cart-source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  items$ = this.cartSource.items$;

  constructor(private cartSource: CartSourceService) {}

  vat = getVAT('IT');

  changeQuantity(item: any, newQuantity: number) {
    // item.quantity = newQuantity;
    // const index = this.items.indexOf(item);
    // const clone = structuredClone(this.items);
    // clone[index].quantity = newQuantity;
    // this.items = clone;
    this.cartSource.setQuantity(item.id, newQuantity);
  }

  trackById(_: number, item: any) {
    return item.id;
  }
}
