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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  items = CART;

  vat = getVAT('IT');

  getItemPrice(item: CartItem) {
    const discoutedPrice = getDiscountedPrice(item.netPrice, item.discount);
    return getPrice(discoutedPrice * item.quantity, this.vat);
  }

  getDiscountAmount(item: CartItem) {
    return getDiscountAmount(item.netPrice, item.discount) * item.quantity;
  }
}
