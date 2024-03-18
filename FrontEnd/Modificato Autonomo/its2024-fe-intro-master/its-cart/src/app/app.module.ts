import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SummaryComponent } from './components/summary/summary.component';
import { DiscountAmountPipe } from './pipes/discount-amount.pipe';

@NgModule({
  declarations: [AppComponent, CartItemComponent, SummaryComponent, DiscountAmountPipe],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NgbModule],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: '€' },
    { provide: LOCALE_ID, useValue: 'it-IT' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
