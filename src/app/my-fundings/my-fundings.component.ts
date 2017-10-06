import { Component, OnInit } from '@angular/core';
import { Web3ServiceService } from '../web3-service.service';
const contract = require('truffle-contract');
const donationTracker = require('../../../build/contracts/DonationsTracker.json');

@Component({
  selector: 'app-my-fundings',
  templateUrl: './my-fundings.component.html',
  styleUrls: ['./my-fundings.component.css']
})
export class MyFundingsComponent implements OnInit {

  constructor(private _web3:Web3ServiceService ) { }
  _donationTracker = contract(donationTracker);
  public Spendings:any;
  public web3:any;
  public UserAccount:any;
  public MyFundsInfo:any;

  ngOnInit() {
    this._web3.getWeb3().then(res => {
      this.web3 = res;
      this.UserAccount = this.web3.eth.accounts[0];
      this._donationTracker.setProvider(this.web3.currentProvider);
      this.myFundsInfo();
      console.log(this.UserAccount);
    })
  	this.Spendings = [
  	{'spentOn':"Tables",'time':65465311,'amount':654,'collAmount':8645,},
  	{'spentOn':"Hats",'time':98646545,'amount':46541,'collAmount':0,},
  	{'spentOn':"Rice",'time':96546534,'amount':54162,'collAmount':684,},
  	{'spentOn':"Food",'time':986465,'amount':6845,'collAmount':54,},
  	{'spentOn':"car",'time':9864654,'amount':654,'collAmount':0,},
  	{'spentOn':"laptops",'time':186498645,'amount':542,'collAmount':654,},
  	{'spentOn':"furniture",'time':86454321,'amount':9864,'collAmount':0,},
  	{'spentOn':"Tables",'time':65465311,'amount':654,'collAmount':8645,},
  	{'spentOn':"Hats",'time':98646545,'amount':46541,'collAmount':0,},
  	{'spentOn':"Rice",'time':96546534,'amount':54162,'collAmount':684,},
  	{'spentOn':"Food",'time':986465,'amount':6845,'collAmount':54,},
  	{'spentOn':"car",'time':9864654,'amount':654,'collAmount':0,},
  	{'spentOn':"laptops",'time':186498645,'amount':542,'collAmount':654,},
  	{'spentOn':"furniture",'time':86454321,'amount':9864,'collAmount':0,}
  	]
  }
  myFundsInfo(){
     this. _donationTracker.deployed().then(instance =>{
      let ContractService = instance;
      ContractService.MyFunds.call(this.UserAccount).then(res =>{
          this.MyFundsInfo = [parseInt(res[0])/1e18,parseInt(res[1])/1e18,parseInt(res[2])/1e18]
        })
    })
  }

}
