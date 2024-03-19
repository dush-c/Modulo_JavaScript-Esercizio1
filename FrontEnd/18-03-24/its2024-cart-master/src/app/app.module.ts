import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SummaryComponent } from './components/summary/summary.component';
import localeIT from '@angular/common/locales/it';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { DiscountAmountPipe } from './pipes/discount-amount.pipe';
import { CartSourceService } from './services/cart-source/cart-source.service';
import { VatService } from './services/vat/vat-.service';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductsComponent } from './pages/products/products.component';
registerLocaleData(localeIT);
@NgModule({
  declarations: [
    AppComponent,
    CartItemComponent,
    SummaryComponent,
    DiscountAmountPipe,
    CheckoutComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: LOCALE_ID, useValue: 'it' },
    CurrencyPipe,
    CartSourceService,
    //{provide: CartSourceService, useClass: CartSourceService}
    VatService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
