function addValidator(web3, validatorViewObj, contractAddr, abi, cb) {
  console.log("***Add validator function***");
  attachToContract(web3, abi, contractAddr, function(err, oraclesContract) {
    console.log("attach to oracles contract");
    if (err) {
      console.log(err)
      return cb();
    }

    console.log(validatorViewObj);
    console.log(oraclesContract);

    var txHash;
    var gasPrice = web3.utils.toWei(new web3.utils.BN(1), 'gwei')
    var opts = {from: web3.eth.defaultAccount, gasPrice: gasPrice}
    
    oraclesContract.methods.addValidator(validatorViewObj.miningKey, 
      validatorViewObj.zip, 
      validatorViewObj.licenseID,
      validatorViewObj.licenseExpiredAt,
      validatorViewObj.fullName,
      validatorViewObj.streetName,
      validatorViewObj.state
      )
    .send(opts)
    .on('error', error => {
      return cb(txHash, error);
    })
    .on('transactionHash', _txHash => {
      console.log("contract method transaction: " + _txHash);
      txHash = _txHash;
    })
    .on('receipt', receipt => {
      return cb(txHash)
    });
  });
}