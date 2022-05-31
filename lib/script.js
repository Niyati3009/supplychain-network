/** 

* Track the trade of a commidity from one trader to another 

* @param {org.supplychain.network.TransferCommodity} trade - the trade is to be processed 

* @transaction 

*/ 

  

function transferCommodity(trade) { 

  console.log('Start function transfer Commodity'); 

  var NS = 'org.supplychain.network'; 

  var me = getCurrentParticipant(); 

  var factory = getFactory(); 

   

  trade.commodity.issuer = me; 

  trade.commodity.owner = trade.newOwner; 

   

  var newTrace = factory.newConcept(NS, 'Trace'); 

  newTrace.timestamp = new Date(); 

  newTrace.location = trade.shipperLocation; 

  newTrace.company = me; 

  trade.commodity.trace.push(newTrace); 

   

  return getAssetRegistry('org.supplychain.network.Commodity').then(function (assetRegistry) { 

   

    return assetRegistry.update(trade.commodity); 

   

  }); 

  

} 
