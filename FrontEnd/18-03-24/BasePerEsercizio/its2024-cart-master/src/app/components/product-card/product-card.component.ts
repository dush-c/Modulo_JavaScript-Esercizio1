import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ReplaySubject, Subject, map } from 'rxjs';
import { Product } from '../../entities/product.entity';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../entities/cart-item.entity';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  //this input gets the data from 'products.component' and use it to create the single product card
  @Input()
  product: Product | null = null;

  //this output needs pass the card info to the 'side-cart.component'
  @Output()
  messageEvent = new EventEmitter<CartItem>();

  quantity: number = 1;

  constructor() {}

  // message: string = 'ciao product-card';
  sendProduct() {
    //opzione 1: '!' sono sicuro che quando questa funzione verrà richiamata, il mio product non sarà mai un oggetto vuoto
    //opzine 2: effettuare un controllo per verificare che l'oggetto 'product' sia effettivamente popolato
    if (this.product) {
      this.messageEvent.emit({
        id: this.product.id,
        product: this.product,
        quantity: this.quantity,
      });
    }
  }
  // products$ = this.activatedRoute.data.pipe(
  //   map(({ products }) => products as Product[])
  // // );
  // testProducts: Product[] = [];

  ngOnInit(): void {}
}
