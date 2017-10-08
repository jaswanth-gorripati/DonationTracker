import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
const Web3 = require('web3');
const contract = require('truffle-contract');
const DonationsTracker = require('../../build/contracts/DonationsTracker.json')
declare var window: any;

@Injectable()
export class Web3ServiceService {
	web3: any;
	isTransferred:any;
	spentEvents:any;
	UserAccount:any;
	 _donationTracker = contract(DonationsTracker);
	   constructor(private router: Router) { 
		    if (typeof web3 !== 'undefined') {
		    var web3 = new Web3(web3.currentProvider);
		    } else {
		      // set the provider you want from Web3.providers
		    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		    }
		    console.log("Provider : ",web3);
	    }
	    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		   
		    if (this.UserAccount) {
		      return true;
		    } else {
		      this.router.navigate(['/']);
		      return false;
		    }
		}
	  setUserAccount(user){
	  	if (typeof web3 !== 'undefined') {
	    	var web3 = new Web3(web3.currentProvider);
	    } else {
	     	// set the provider you want from Web3.providers
	    	var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	    }
	    let accounts = web3.eth.accounts;
	    for(let i=0;i<accounts.length;i++){
	    	if(accounts[i] === user){
	    		this.UserAccount = user;
	    	}
	    }
	  }
	  getUserAccount(){
	  	return Promise.resolve(this.UserAccount);
	  }
	 getWeb3():any{
	 	if (typeof web3 !== 'undefined') {
	    	var web3 = new Web3(web3.currentProvider);
	    } else {
	     	// set the provider you want from Web3.providers
	    	var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	    }
	 	return Promise.resolve(web3);
	 }
	 isFundsTransfered(userAccount,DonationAmount){
	 	if (typeof web3 !== 'undefined') {
	    	var web3 = new Web3(web3.currentProvider);
	    } else {
	     	// set the provider you want from Web3.providers
	    	var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	    }
	    this._donationTracker.setProvider(web3.currentProvider);
	 	this. _donationTracker.deployed().then(instance =>{
	 		let istf;
	      //let contractService = instance;
	      web3.eth.sendTransaction({from:userAccount,to:instance.address,value:web3.toWei(DonationAmount,'ether'),gas:2222222},function(err, txHash) {
	        if (!err){
	        	istf = txHash;
	        }else{
	        	istf = null;
	        }
	      })
	      setTimeout(() =>{
	      	this.isMined(istf,this.minedD);
	      	alert("checking for mining")
	    	console.log("mining tx:",istf);
	      },1000)
	    })
	 }
	  isPaymentSuccesful(invoiceRefNo,ReqAmount,MerchentAddress,ProductName){
	 	if (typeof web3 !== 'undefined') {
	    	var web3 = new Web3(web3.currentProvider);
	    } else {
	     	// set the provider you want from Web3.providers
	    	var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	    }
	    this._donationTracker.setProvider(web3.currentProvider);
	 	this. _donationTracker.deployed().then(instance =>{
	 	  let istf;
	      let ContractService = instance;
	      ContractService.RequestToPay(invoiceRefNo,ReqAmount,MerchentAddress,ProductName,{from:this.UserAccount,gas:2222222},function(err, txHash) {
	        if (!err){
	        	istf = txHash;
	        }else{
	        	istf = null;
	        }
	      })
	      setTimeout(() =>{
	      	this.isMined(istf,this.minedR);
	      	alert("checking for mining")
	    	console.log("mining tx:",istf);
	      },1000)
	    })
	 }
	 minedD(mine){
	 	this.isTransferred =mine;
	 }
	 minedR(mine){
	 	if(mine == true)
	 		alert("Payment Succesfull")
	 	else
	 		alert("payment Failed")
	 }
	 isMined(tx,callback){
	 	if (typeof web3 !== 'undefined') {
	    	var web3 = new Web3(web3.currentProvider);
	    } else {
	     	// set the provider you want from Web3.providers
	    	var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	    }
	    let minedQ;
	    web3.eth.getTransactionReceipt(tx,function(err,result){
	      if(err){
	        alert("error while processing");
	        minedQ= false;
	      }else if(result == null){
	        this.isMined(tx);
	      }else{
	      	alert("minned successfully")
	      	minedQ= true;
	      }
	    })
	    setTimeout(()=>{
	    	if(minedQ == true){
	    		callback(true);
	    	}else if(minedQ == false){
	    		callback(false);
	    	}
	    },1000)
	 }
	 getIsTransfered():any{
	 	return	Promise.resolve(this.isTransferred);
	 }
	 setIsTransferd(){
	 	this.isTransferred = undefined;
	 }
	 fundsSpentEvents():any{
	 	if (typeof web3 !== 'undefined') {
	    	var web3 = new Web3(web3.currentProvider);
	    } else {
	     	// set the provider you want from Web3.providers
	    	var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	    }
	 	this._donationTracker = contract(DonationsTracker);
	 	this. _donationTracker.setProvider(web3.currentProvider);
	 	this. _donationTracker.deployed().then(instance =>{
	        let ContractInstance = instance;
	        let tempSpent = [];
	        let GotEvent = ContractInstance.FundsSpentEvent({FromFunder:web3.eth.accounts[0]},{fromBlock:'0',toBlock:'latest'},function(err,result){
	        	console.log("web3 event :",result)
	        	if (err)
		            console.log('Error in myEvent event handler: ' + err);
		          else{
		          	//console.log(rideResult.args);
		          	tempSpent.push(result.args);
		           	console.log(tempSpent);
		          }
		        })
		        setTimeout(() =>{
			      	this.spentEvents = tempSpent;
			    },1000)
	        });
	        //GotEvent.watch(function(err,result){
	          
	    //})
	    
	 }
	 getFundsTransferEvent():any{
	 	console.log(this.spentEvents);
	 	return	Promise.resolve(this.spentEvents);
	 }
}
