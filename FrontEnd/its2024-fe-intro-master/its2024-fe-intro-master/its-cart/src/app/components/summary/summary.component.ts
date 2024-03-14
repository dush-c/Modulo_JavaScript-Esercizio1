import { Component, Input } from '@angular/core';
import { CartItem } from '../../cart-item.entity';
import { parseItem } from '../../cart-utils';
import { CART } from '../../cart';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent {
  //leggi i valori di cart-item e calcola i vari prezzi
  /**
   * getTransportFee
   */
  // items = CART;

  @Input()
  items: CartItem[] = [];

  // vat = 0.22;
  @Input()
  vat: number = 0;

  getNetPriceTotal() {
    const calculatedItems = this.getCalculatedItems();
    return calculatedItems.reduce((total, item) => {
      return total + item.price;
    }, 0);
  }

  getVatTotal() {
    const calculatedItems = this.getCalculatedItems();
    return calculatedItems.reduce((total, item) => {
      return total + item.vatAmount;
    }, 0);
  }

  getTransportFee() {
    //ritorna il prezzo di trasporto in base al peso
    const calculatedItems = this.getCalculatedItems();
    const weight = calculatedItems.reduce((total, item) => {
      return total + item.weight;
    }, 0);
    return this.calculateTransportFee(weight);
  }

  calculateTransportFee(weight: number) {
    let transportFee = 0;
    if (weight > 2000) {
      transportFee = 7;
    }
    if (weight > 5000) {
      transportFee = 15;
    }
    if (weight > 10000) {
      transportFee = 25;
    }
    return transportFee;
  }

  getTotal() {
    const calculatedItems = this.items!.map((item) =>
      parseItem(item, this.vat)
    );

    const total = calculatedItems.reduce((total, item) => {
      return total + item.price;
    }, 0);

    return total + this.getTransportFee();
  }

  getCalculatedItems() {
    return this.items.map((item) => parseItem(item, this.vat));
  }
}
