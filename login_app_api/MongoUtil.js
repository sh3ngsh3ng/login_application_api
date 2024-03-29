const MongoClient = require('mongodb').MongoClient

let _db

async function connect (url, dbname) {
    let client = await MongoClient.connect(url, {
        useUnifiedTopology: true
    })
    _db = client.db(dbname)
    console.log("Database Connected")
}

function getDB() {
    return _db
}

module.exports = {
    connect, getDB
}