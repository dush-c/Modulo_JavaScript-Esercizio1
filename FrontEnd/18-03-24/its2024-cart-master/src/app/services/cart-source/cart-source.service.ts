import { Injectable } from '@angular/core';
import { CART } from '../../cart';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../entities/cart-item.entity';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CartSourceService {
  // private items = [...CART];
  protected _items$ = new BehaviorSubject<CartItem[]>([...CART]);
  items$ = this._items$.asObservable();

  constructor(protected http: HttpClient) {
    this.fetch();
  }

  setQuantity(id: string, quantity: number) {
    const index = this._items$.value.findIndex(
      (item) => item.product.id === id
    );
    const tmp = structuredClone(this._items$.value);
    tmp[index].quantity = quantity;
    this._items$.next(tmp);
  }

  fetch() {
    this.http.get<CartItem[]>('/api/cart-items').subscribe((items) => {
      this._items$.next(items);
    });
  }
}
