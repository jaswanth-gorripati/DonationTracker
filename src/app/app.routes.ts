import { NgModule } from '@angular/core';
import {RouterModule , Routes } from '@angular/router';

import { DonateComponent } from './donate/donate.component';
import { MyFundingsComponent } from './my-fundings/my-fundings.component';
import { RequestPaymentsComponent } from './request-payments/request-payments.component';

const LFC : Routes = [
{path:'home',component:DonateComponent},
{path:'myFundings',component:MyFundingsComponent},
{path: '',redirectTo: 'home',pathMatch: 'full'},
{path: 'ReqPayment',pathMatch: 'full',component:RequestPaymentsComponent}
];

@NgModule({
	imports:[
		RouterModule.forRoot(
			LFC
		)
	],
	exports:[
	RouterModule
	]
})

export class PDRoutingModule {}