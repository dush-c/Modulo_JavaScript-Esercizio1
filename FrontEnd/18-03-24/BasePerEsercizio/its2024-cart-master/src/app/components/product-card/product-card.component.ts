import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Product } from '../../entities/product.entity';

export type ProductCartAddEvent = { id: string; quantity: number };

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {
  //this input gets the data from 'products.component' and use it to create the single product card
  @Input()
  product: Product | null = null;

  //this output needs pass the card info to the 'side-cart.component'
  @Output()
  add = new EventEmitter<ProductCartAddEvent>();

  @Output()
  productDetails = new EventEmitter<Product>();

  quantity: number = 1;

  constructor() {}

  onAdd() {
    if (this.quantity > 0) {
      this.add.emit({ id: this.product!.id, quantity: this.quantity });
    }
  }

  ngOnInit(): void {}
}
