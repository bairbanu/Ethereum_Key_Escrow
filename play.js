const Web3 = require('web3')

const web3 = new Web3('http://localhost:8545')

// fake private key
const privateKeyToSave = '0x' + '3a1076bf45ab87712ad64ccb3b10217737f7faacbf2872e88fdd9a537d8fe266'

// Acccount information
const accountAddress = '0x421d17d3a56c3312013f13f76ee01ee74d5de6b8'
const accountPrivateKey = '79541ca33808c4ce0a3893c092880ab79ee9c56fdce4d4d4d09f5a31acb837c7'

const recipientAddress = '0xd389737259d7fe6002345c2c5594f52e0e280093'

const test = async () => {
    const obj = await web3.eth.signTransaction({
        from: accountAddress,
        gasPrice: '20000000000',
        gas: '1000000',
        to: recipientAddress,
        value: "1000000000000000000",
        data: privateKeyToSave,
        nonce: '12'
    })

    console.log('this is the raw transaction:::', obj.raw)

}

test()