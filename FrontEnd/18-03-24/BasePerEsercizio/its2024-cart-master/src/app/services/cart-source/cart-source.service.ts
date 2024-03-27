import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../entities/cart-item.entity';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CartSourceService {
  //il subject è un observable che ha la possibilità di emettere un nuovo valore tramite il metodo .next()
  protected _items$ = new BehaviorSubject<CartItem[]>([]);
  //un observable è un componente che comunica a tutti coloro che sono iscritti tramite il metodo .subscribe(),
  // ogni volta che l'observable alla quale io sono iscritto viene aggiornato
  //viene richiamata la funzione all'interno del mio metodo .subscribe
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

  add(productId: string, quantity: number) {
    const data = {
      productId: productId,
      quantity: quantity,
    };
    this.http.post<CartItem>(`/api/cart-items`, data).subscribe((cartItem) => {
      const tmp = structuredClone(this._items$.value);
      const index = this._items$.value.findIndex(
        (item) => item.id === cartItem.id
      );

      if (index === -1) {
        //aggiungo
        tmp.push(cartItem);
      } else {
        //l'elemento esiste
        tmp[index] = cartItem;
      }
      this._items$.next(tmp);
    });
  }

  remove(id: string) {
    this.http.delete<void>(`/api/cart-items/${id}`).subscribe(() => {
      const tmp = structuredClone(this._items$.value);
      const index = this._items$.value.findIndex((item) => item.id === id);
      if (index >= 0) {
        tmp.splice(index, 1);
        this._items$.next(tmp);
      }
    });
  }
}
