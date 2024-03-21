import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../entities/cart-item.entity';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CartSourceService {
  protected _items$ = new BehaviorSubject<CartItem[]>([]);
  items$ = this._items$.asObservable();

  constructor(protected http: HttpClient) {
    this.fetch();
  }

  setQuantity(id: string, quantity: number) {
    this.http
      .patch<CartItem>(`/api/cart-items/${id}`, { quantity })
      .subscribe((updated) => {
        const index = this._items$.value.findIndex((item) => item.id === id);
        const tmp = structuredClone(this._items$.value);
        tmp[index] = updated;
        this._items$.next(tmp);
      });
  }

  fetch() {
    this.http.get<CartItem[]>('/api/cart-items').subscribe((items) => {
      this._items$.next(items);
    });
  }

  bodyPost = {};
  add($event: CartItem) {
    //vado ad aggiungere un item a 'items$' così che tutti gli elementi che si basano sul mio observable vengono aggiornati in automatico
    // console.log($event);
    // const cart = this._items$.value;
    this._items$.value.push($event);
    // console.log(cart);
    // this.http.post<CartItem>('/api/cart-items').subscribe((item) => {
    //   this._items$.next(item);
    // });
  }
}