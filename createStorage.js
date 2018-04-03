const Web3 = require('web3')
const web3 = new Web3('http://localhost:8545')
const EthCrypto = require('eth-crypto')

const db = require('./database/connection')

// Update address with what is spit onto the geth console when deployed from Remix
const contractAddress = "0xC660eB0D4052a5b26ed08948590c3E582818f44e";
const ABI = [ { constant: true, inputs: [], name: "keyEscrow", outputs: [ { name: "", type: "string" } ], payable: false, stateMutability: "view", type: "function" }, { constant: false, inputs: [ { name: "rawTransaction", type: "string" } ], name: "storeTransactions", outputs: [], payable: false, stateMutability: "nonpayable", type: "function" } ]

// Update with recipient smart contract address as shown on geth console after deploying from Remix
const recipientContractAddress = "0xd389737259d7fe6002345c2c5594f52e0e280093"

const createStorage = async () => {
    // Data to encryt and cold store in the smart contract
    const data = process.argv[2]

    // Create sender and recipent identities
    console.log('Generating keys...')

    const sender = EthCrypto.createIdentity()
    const recipient = EthCrypto.createIdentity()

    // console.log('Saving keys to database...')

    // const savingKeys = ['sender', sender.address, sender.publicKey, sender.privateKey, 'recipient', recipient.address, recipient.publicKey, recipient.privateKey]
    // await db.none('INSERT INTO key_storage VALUES ($1, $2, $3, $4), ($5, $6, $7, $8)', savingKeys)

    // console.log('Keys saved in database.')

    // Encrypt data
    console.log(`Encrypting and signing data::: ${data}`)

    const signature = EthCrypto.sign(
        sender.privateKey,
        EthCrypto.hash.keccak256(data)
    )

    const payload = {
        message: data,
        signature
    }


    const encrytedData = await EthCrypto.encryptWithPublicKey(
        recipient.publicKey,
        JSON.stringify(payload)
    )

    // const encrytedStringData = JSON.stringify(encrytedData)
    // const encrytedHexData = web3.utils.asciiToHex(encrytedStringData)

    const decrypted = await EthCrypto.decryptWithPrivateKey(
        recipient.privateKey,
        encrytedData
    )

    console.log(decrypted)


    // Connect with smart contract
    // const contractInstance = await new web3.eth.Contract(ABI, contractAddress)
    
    // // Acccount information
    // const accountAddress = "0x421d17d3a56c3312013f13f76ee01ee74d5de6b8"
    // const accountPrivateKey = "79541ca33808c4ce0a3893c092880ab79ee9c56fdce4d4d4d09f5a31acb837c7"
    
    // console.log('Creating cold transaction...')

    // const obj = await web3.eth.signTransaction({
    // from: accountAddress,
    // gasPrice: "20000000000",
    // gas: "1000000",
    // to: recipientAddress,
    // value: "1000000000000000000",
    // data: encrytedHexData,
    // nonce: "12"
    // });

    // let rawTransaction = obj.raw

    // console.log('Storing data securely on smart contract...')

    // await contractInstance.methods.storeTransactions(rawTransaction).send({
    //     from: accountAddress,
    //     gas: '1000000'
    // })

    // console.log('Data stored securely on smart contract at address:', contractAddress)
}

createStorage()