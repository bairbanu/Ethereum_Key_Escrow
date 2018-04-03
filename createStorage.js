const Web3 = require('web3')
const web3 = new Web3('http://localhost:8545')

// Update address with what is spit onto the geth console when deployed from Remix
const contractAddress = '0xd2f16724283bc3e45e89b4148d204a1b63220e45'
const ABI = [ { constant: false, inputs: [ { name: "rawTransaction", type: "string" } ], name: "storeTransactions", outputs: [], payable: false, stateMutability: "nonpayable", type: "function" }, { constant: true, inputs: [ { name: "", type: "uint256" } ], name: "keyEscrows", outputs: [ { name: "", type: "string" } ], payable: false, stateMutability: "view", type: "function" } ]

const createStorage = async () => {
    // data to encryt and cold store in the smart contract
    const data = process.argv[2]

    // connect with smart contract
    const contractInstance = await new web3.eth.Contract(ABI, contractAddress)
    
    // Acccount information
    const accountAddress = "0x421d17d3a56c3312013f13f76ee01ee74d5de6b8"
    const accountPrivateKey =
      "79541ca33808c4ce0a3893c092880ab79ee9c56fdce4d4d4d09f5a31acb837c7"
    
    // Update with recipient smart contract address as shown on geth console after deploying from Remix
    const recipientAddress = "0xd389737259d7fe6002345c2c5594f52e0e280093"
    
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


createStorage()


// send it to smart contract for storage
// We're at keyEscrows[1]