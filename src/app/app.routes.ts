import { NgModule } from '@angular/core';
import {RouterModule , Routes } from '@angular/router';
import { Web3ServiceService } from './web3-service.service';

import { DonateComponent } from './donate/donate.component';
import { MyFundingsComponent } from './my-fundings/my-fundings.component';
import { RequestPaymentsComponent } from './request-payments/request-payments.component';

const LFC : Routes = [
{path:'home',component:DonateComponent},
{path:'myFundings',component:MyFundingsComponent,canActivate: [Web3ServiceService]},
{path: '',redirectTo: 'home',pathMatch: 'full'},
{path: 'ReqPayment',pathMatch: 'full',component:RequestPaymentsComponent,canActivate: [Web3ServiceService]}
];

@NgModule({
	imports:[
		RouterModule.forRoot(
			LFC
		)
	],
	exports:[
	RouterModule
	],
	providers: [
	    Web3ServiceService
	  ]
})

export class PDRoutingModule {}