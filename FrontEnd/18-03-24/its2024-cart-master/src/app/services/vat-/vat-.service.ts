import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VatService {
  protected _value$ = new BehaviorSubject<number>(0);
  value$ = this._value$.asObservable();

  getVat(country_code: string) {
    if (country_code === 'IT') {
      this._value$.next(0.22);
    } else {
      this._value$.next(0);
    }
  }
}
