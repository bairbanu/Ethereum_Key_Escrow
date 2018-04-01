const Web3 = require('web3')

const web3 = new Web3('http://localhost:8545')

const contractAddress = "0xd2f16724283bc3e45e89b4148d204a1b63220e45";
const ABI = [ { constant: false, inputs: [{ name: "rawTransaction", type: "string" }], name: "storeTransactions", outputs: [], payable: false, stateMutability: "nonpayable", type: "function" }, { constant: true, inputs: [{ name: "", type: "uint256" }], name: "keyEscrows", outputs: [{ name: "", type: "string" }], payable: false, stateMutability: "view", type: "function" } ]

const SendRawTransaction = async () => {
    const contractInstance = await new web3.eth.Contract(ABI, contractAddress)

    const rawTransaction = await contractInstance.methods.keyEscrows(0).call()
    const receipt = await web3.eth.sendSignedTransaction(rawTransaction)

    console.log(receipt)
}

SendRawTransaction()