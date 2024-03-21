import { ResolveFn } from '@angular/router';
import { ProductFilters } from '../services/product/product.service';

export const productFiltersResolver: ResolveFn<ProductFilters> = (route) => {
  return route.queryParams;
};
