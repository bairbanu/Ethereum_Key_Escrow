const openpgp = require('openpgp')

const keyGeneration = async () => {
  // RECEIVER SIDE
  const optionsGen = {
    userIds: [{ name: "Jon Smith", email: "jon@example.com" }], // multiple user IDs
    curve: "ed25519", // ECC curve name
    passphrase: "super long and hard to guess secret" // protects the private key
  }
  
  const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey(optionsGen)

  // SENDER SIDE
  var pubkey = publicKeyArmored//'-----BEGIN PGP PUBLIC KEY BLOCK----- Version: OpenPGP.js v3.0.3 Comment: https://openpgpjs.org xjMEWsA7yBYJKwYBBAHaRw8BAQdAFAvN8AAS6X+JCVKxqxZNU3wGtFFFCufy f4eCN6F6IT/NG0pvbiBTbWl0aCA8am9uQGV4YW1wbGUuY29tPsJ3BBAWCgAp BQJawDvIBgsJBwgDAgkQPuNxWRuqpQAEFQgKAgMWAgECGQECGwMCHgEAAO1I AQCc5OJAgymBr0kJYzs73xpBJHGMRdHf6h8K/YQpAWGL6wEA2bwNuQtoHabO dfNym+gClYxzZHBlNjldhpaQiKAjeAHOOARawDvIEgorBgEEAZdVAQUBAQdA brPiygkscQMBR8hL6ltQ5w+FctUaRklUr4909QSw9hYDAQgHwmEEGBYIABMF AlrAO8gJED7jcVkbqqUAAhsMAABwrgEA56TDhrmTexf68YZimyRpilQVZdCD 3EPYl1KGRepC+AsBAPCHneayHAVIliJuv8tMEq4S/ZmBNM2DJMS2msm7/3UL =8ywD -----END PGP PUBLIC KEY BLOCK-----'
  //var privkey = privateKeyArmored//'-----BEGIN PGP PRIVATE KEY BLOCK----- Version: OpenPGP.js v3.0.3 Comment: https://openpgpjs.org xYYEWsA7yBYJKwYBBAHaRw8BAQdAFAvN8AAS6X+JCVKxqxZNU3wGtFFFCufy f4eCN6F6IT/+CQMIUAqHnzZaRn9gCFMW8qusYm4sZqfLmbiInBTMONGsPUCx e0+27Zm+snth3oISM+zxXy5RdyClQpl7dXpR1FQHir0QUXuEzSisEcYxikws fc0bSm9uIFNtaXRoIDxqb25AZXhhbXBsZS5jb20+wncEEBYKACkFAlrAO8gG CwkHCAMCCRA+43FZG6qlAAQVCAoCAxYCAQIZAQIbAwIeAQAA7UgBAJzk4kCD KYGvSQljOzvfGkEkcYxF0d/qHwr9hCkBYYvrAQDZvA25C2gdps5183Kb6AKV jHNkcGU2OV2GlpCIoCN4AceLBFrAO8gSCisGAQQBl1UBBQEBB0Bus+LKCSxx AwFHyEvqW1DnD4Vy1RpGSVSvj3T1BLD2FgMBCAf+CQMI9LC9jEvAQtpgFAQw 1a+UOp4eTvKZR2yBDdUE/kM1sUUIz5GZ8pxedmBK58p/VhcQjSR3ZAMDvoeK BAerwROOsh297U9vpz2VZrpGc76JzMJhBBgWCAATBQJawDvICRA+43FZG6ql AAIbDAAAcK4BAOekw4a5k3sX+vGGYpskaYpUFWXQg9xD2JdShkXqQvgLAQDw h53mshwFSJYibr/LTBKuEv2ZgTTNgyTEtprJu/91Cw== =hmox -----END PGP PRIVATE KEY BLOCK-----'
  //var passphrase = "super long and hard to guess secret"

  //var privKeyObj = openpgp.key.readArmored(privkey).keys[0];
  //await privKeyObj.decrypt(passphrase);

  const options = { data: "Hello, World!",
    publicKeys: openpgp.key.readArmored(pubkey).keys,
    //privateKeys: [privKeyObj] 
  }

  const ciphered = await openpgp.encrypt(options)
  console.log(String.raw(ciphered.data))
}

keyGeneration()

/*
-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v3.0.3
Comment: https://openpgpjs.org

xjMEWsA7yBYJKwYBBAHaRw8BAQdAFAvN8AAS6X+JCVKxqxZNU3wGtFFFCufy
f4eCN6F6IT/NG0pvbiBTbWl0aCA8am9uQGV4YW1wbGUuY29tPsJ3BBAWCgAp
BQJawDvIBgsJBwgDAgkQPuNxWRuqpQAEFQgKAgMWAgECGQECGwMCHgEAAO1I
AQCc5OJAgymBr0kJYzs73xpBJHGMRdHf6h8K/YQpAWGL6wEA2bwNuQtoHabO
dfNym+gClYxzZHBlNjldhpaQiKAjeAHOOARawDvIEgorBgEEAZdVAQUBAQdA
brPiygkscQMBR8hL6ltQ5w+FctUaRklUr4909QSw9hYDAQgHwmEEGBYIABMF
AlrAO8gJED7jcVkbqqUAAhsMAABwrgEA56TDhrmTexf68YZimyRpilQVZdCD
3EPYl1KGRepC+AsBAPCHneayHAVIliJuv8tMEq4S/ZmBNM2DJMS2msm7/3UL

=8ywD
-----END PGP PUBLIC KEY BLOCK-----
*/

/*
-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: OpenPGP.js v3.0.3
Comment: https://openpgpjs.org

xYYEWsA7yBYJKwYBBAHaRw8BAQdAFAvN8AAS6X+JCVKxqxZNU3wGtFFFCufy
f4eCN6F6IT/+CQMIUAqHnzZaRn9gCFMW8qusYm4sZqfLmbiInBTMONGsPUCx
e0+27Zm+snth3oISM+zxXy5RdyClQpl7dXpR1FQHir0QUXuEzSisEcYxikws
fc0bSm9uIFNtaXRoIDxqb25AZXhhbXBsZS5jb20+wncEEBYKACkFAlrAO8gG
CwkHCAMCCRA+43FZG6qlAAQVCAoCAxYCAQIZAQIbAwIeAQAA7UgBAJzk4kCD
KYGvSQljOzvfGkEkcYxF0d/qHwr9hCkBYYvrAQDZvA25C2gdps5183Kb6AKV
jHNkcGU2OV2GlpCIoCN4AceLBFrAO8gSCisGAQQBl1UBBQEBB0Bus+LKCSxx
AwFHyEvqW1DnD4Vy1RpGSVSvj3T1BLD2FgMBCAf+CQMI9LC9jEvAQtpgFAQw
1a+UOp4eTvKZR2yBDdUE/kM1sUUIz5GZ8pxedmBK58p/VhcQjSR3ZAMDvoeK
BAerwROOsh297U9vpz2VZrpGc76JzMJhBBgWCAATBQJawDvICRA+43FZG6ql
AAIbDAAAcK4BAOekw4a5k3sX+vGGYpskaYpUFWXQg9xD2JdShkXqQvgLAQDw
h53mshwFSJYibr/LTBKuEv2ZgTTNgyTEtprJu/91Cw==
=hmox
-----END PGP PRIVATE KEY BLOCK-----
*/