import { Injectable } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
const DonationsTracker = require('../../build/contracts/DonationsTracker.json')
declare var window: any;

@Injectable()
export class Web3ServiceService {
	web3: any;
	isTransferred:any;
	 _donationTracker = contract(DonationsTracker);
	  constructor() { 
		    if (typeof web3 !== 'undefined') {
		    var web3 = new Web3(web3.currentProvider);
		    } else {
		      // set the provider you want from Web3.providers
		    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		    }
		    console.log("Provider : ",web3);
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
	        	istf = true;
	        }else{
	        	istf = false;
	        }
	      })
	      setTimeout(() =>{
	      	this.isTransferred = istf;
	      },1000)
	    })
	 }
	 getIsTransfered():any{
	 	return	Promise.resolve(this.isTransferred);
	 }
	 setIsTransferd(){
	 	this.isTransferred = undefined;
	 }
	 /*getRideEvents():any{
	 	if (typeof web3 !== 'undefined') {
	    	var web3 = new Web3(web3.currentProvider);
	    } else {
	     	// set the provider you want from Web3.providers
	    	var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	    }
	    var data;
	 	this._carServiceContract = contract(carServiceContract);
	 	this. _carServiceContract.setProvider(web3.currentProvider);
	 	this. _carServiceContract.deployed().then(instance =>{
	        let ContractInstance = instance;
	        let GotRide = ContractInstance.RideRequestEvent({requestedDriver:web3.eth.accounts[0]},{fromBlock:'latest',toBlock:'latest'});
	        GotRide.watch(function(err,rideResult){
	          if (err)
	            console.log('Error in myEvent event handler: ' + err);
	          else{
	          	//console.log(rideResult.args);
	          	data = rideResult.args;
	           	console.log(data);
	          }
	        })
	    })
	    return Promise.resolve(data);
	 }*/
}
