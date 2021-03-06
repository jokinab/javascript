'use strict'

const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017'
const dbName = 'backedge'

async function finding (colName, query, id) {
  const client = new MongoClient(url, { useNewUrlParser: true })
  try {
    await client.connect()
    const db = client.db(dbName)

    let result = await db.collection(colName).find(query).toArray()
    if (result) client.close()
    console.log(`resultado busqueda ${JSON.stringify(result)}`)
    return result
  } catch (err) {
    console.log(err.stack)
    // client.close()
    return err
  }
}

async function inserting (colName, document) {
  const client = new MongoClient(url, { useNewUrlParser: true })
  try {
    await client.connect()
    console.log('Connected correctly to server')
    console.log(`${JSON.stringify(document)} will be inserted`)
    const db = client.db(dbName)
    let result = await db.collection(colName).insertOne(document)
    if (result) client.close()
    return result
  } catch (err) {
    // client.close()
    console.log(err.stack)
  }
}

async function updating (colName, query, id, document) {
  const client = new MongoClient(url, { useNewUrlParser: true })
  try {
    await client.connect()
    if (id) query._id = new ObjectID(id)
    console.log('Connected correctly to server')
    console.log(`${JSON.stringify(document)} will be update`)
    const db = client.db(dbName)
    let result = await db.collection(colName).update(query, document)
    if (result) client.close()
    return result
  } catch (err) {
    // client.close()
    console.log(err.stack)
  }
}

async function deleting (colName, query, id) {
  const client = new MongoClient(url, { useNewUrlParser: true })
  try {
    await client.connect()
    if (id) query._id = new ObjectID(id)
    console.log('Connected correctly to server')
    console.log(`${JSON.stringify(id)} will be delete`)
    const db = client.db(dbName)
    let result = await db.collection(colName).deleteOne(query)
    if (result) client.close()
    return result
  } catch (err) {
    // client.close()
    console.log(err.stack)
  }
}

async function aggregating (colName, query) {
  const client = new MongoClient(url, { useNewUrlParser: true })
  try {
    await client.connect()
    console.log('Connected correctly to server')
    console.log(`aggregating`)
    const db = client.db(dbName)
    let result = await db.collection(colName).aggregate(query).toArray()
    if (result) client.close()
    return result
  } catch (err) {
    // client.close()
    console.log(err.stack)
  }
}

module.exports = {
  finding: finding,
  inserting: inserting,
  updating: updating,
  deleting: deleting,
  aggregating: aggregating
}
