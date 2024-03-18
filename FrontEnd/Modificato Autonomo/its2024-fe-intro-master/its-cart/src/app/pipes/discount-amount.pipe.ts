import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
@Pipe({
  name: 'discountAmount',
})
export class DiscountAmountPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

  constructor(private currency: CurrencyPipe) {}

  transfrom(value: number): unknown {
    const currencyString = this.currency.transform(value, '', '');
    return value ? `(-${currencyString})` : '';
  }
}
