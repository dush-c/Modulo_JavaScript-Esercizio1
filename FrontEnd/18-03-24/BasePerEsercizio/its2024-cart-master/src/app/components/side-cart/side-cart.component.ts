import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../entities/product.entity';
import { CartItem } from '../../entities/cart-item.entity';

@Component({
  selector: 'app-side-cart',
  templateUrl: './side-cart.component.html',
  styleUrl: './side-cart.component.css',
})
export class SideCartComponent implements OnInit {
  @Input()
  cartItem: CartItem | undefined;

  constructor() {}

  ngOnInit(): void {}
}
