const pgp = require('pg-promise')()

const dbName = 'handoff'
const connectionString = `postgres://localhost:5432/${dbName}`

const db = pgp(connectionString)

module.exports = db