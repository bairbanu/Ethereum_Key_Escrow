const Web3 = require('web3')
const web3 = new Web3('http://localhost:8545')

const contractAddress = '0xd2f16724283bc3e45e89b4148d204a1b63220e45'
const ABI = [ { constant: false, inputs: [ { name: "rawTransaction", type: "string" } ], name: "storeTransactions", outputs: [], payable: false, stateMutability: "nonpayable", type: "function" }, { constant: true, inputs: [ { name: "", type: "uint256" } ], name: "keyEscrows", outputs: [ { name: "", type: "string" } ], payable: false, stateMutability: "view", type: "function" } ]

const HandOffPOC = async () => {
    // connect with smart contract
    const contractInstance = await new web3.eth.Contract(ABI, contractAddress)

    // fake private key
    const privateKeyToSave =
      "0x" + "3a1076bf45ab87712ad64ccb3b10217737f7faacbf2872e88fdd9a537d8fe266";
    
    // Acccount information
    const accountAddress = "0x421d17d3a56c3312013f13f76ee01ee74d5de6b8";
    const accountPrivateKey =
      "79541ca33808c4ce0a3893c092880ab79ee9c56fdce4d4d4d09f5a31acb837c7";
    
    const recipientAddress = "0xd389737259d7fe6002345c2c5594f52e0e280093";
    
    const obj = await web3.eth.signTransaction({
    from: accountAddress,
    gasPrice: "20000000000",
    gas: "1000000",
    to: recipientAddress,
    value: "1000000000000000000",
    data: privateKeyToSave,
    nonce: "12"
    });

    let rawTransaction = obj.raw

    await contractInstance.methods.storeTransactions(rawTransaction).send({
        from: accountAddress,
        gas: '1000000'
    })
}


HandOffPOC()


// send it to smart contract for storage