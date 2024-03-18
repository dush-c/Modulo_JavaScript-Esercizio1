import { Injectable } from '@angular/core';
import { CART } from '../../cart';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../cart-item.entity';

@Injectable()
export class CartSourceService {
  // private items = [...CART];
  protected _items$ = new BehaviorSubject<CartItem[]>([...CART]);

  items$ = this._items$.asObservable();

  setQuantity(id: number, quantity: number) {
    const index = this._items$.value.findIndex((item) => item.id === id);
    const tmp = structuredClone(this._items$.value);
    tmp[index].quantity = quantity;
    this._items$.next(tmp);
  }
}
