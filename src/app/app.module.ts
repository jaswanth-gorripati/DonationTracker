import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule , Routes } from '@angular/router';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { Web3ServiceService } from './web3-service.service'
import { PDRoutingModule } from './app.routes'
import { AppComponent } from './app.component';
import { MyFundingsComponent } from './my-fundings/my-fundings.component';
import { DonateComponent } from './donate/donate.component';
import { RequestPaymentsComponent } from './request-payments/request-payments.component';

@NgModule({
  declarations: [
    AppComponent,
    MyFundingsComponent,
    DonateComponent,
    RequestPaymentsComponent
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,PDRoutingModule
  ],
  providers: [Web3ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
