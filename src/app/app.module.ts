import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@Angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG  } from "ng2-currency-mask";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { LoginComponent } from './components/account/login/login.component';
import { CreateComponent } from './components/account/create/create.component';
import { LoginService } from './services/login.service';
import { AccountPanelComponent } from './components/account/account-panel/account-panel.component';


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ".",
  precision: 2,
  prefix: "$ ",
  suffix: "",
  thousands: ","
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoadingComponent,
    LoginComponent,
    CreateComponent,
    AccountPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar :true,
      progressAnimation : 'increasing',
      timeOut:2000,
      closeButton:true,
    }),
    CurrencyMaskModule,
  ],
  providers: [LoginService, { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
