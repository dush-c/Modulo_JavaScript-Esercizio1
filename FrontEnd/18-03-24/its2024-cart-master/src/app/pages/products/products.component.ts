import { Component, OnInit } from '@angular/core';
import {
  ProductFilters,
  ProductService,
} from '../../services/product/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { debounceTime, filter, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  filters = this.fb.group({
    name: ['', { updateOn: 'change' }],
    minPrice: [null, { validators: [Validators.min(0)] }],
    maxPrice: [null, { updateOn: 'submit' }],
  });

  products$ = this.filters.valueChanges.pipe(
    filter((_) => this.filters.valid),
    startWith<ProductFilters>({}),
    filter((value) => {
      return !value.name || value.name.length > 3;
    }),
    debounceTime(150),
    switchMap((filters) => {
      return this.productSrv.list(filters);
    })
  );

  constructor(
    protected productSrv: ProductService,
    protected fb: FormBuilder
  ) {}
  ngOnInit(): void {}
}
