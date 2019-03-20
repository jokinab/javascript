'use strict'

const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017'
const dbName = 'backedge'

const finding = async (colName, query, id) => {
  const client = new MongoClient(url, { useNewUrlParser: true })
  try {
    await client.connect()
    const db = client.db(dbName)
    if (id) query._id = new ObjectID(id)
    let result = await db.collection(colName).find(query).toArray()
    if (result) client.close()
    // console.log(`resultado busqueda ${JSON.stringify(result)}`)
    return result
  } catch (err) {
    console.log(err.stack)
    client.close()
    return err
  }
}

const inserting = async (colName, document) => {
  const client = new MongoClient(url, { useNewUrlParser: true })
  try {
    await client.connect()
    // console.log(`${JSON.stringify(document)} will be inserted`)
    const db = client.db(dbName)
    let result = await db.collection(colName).insertOne(document)
    if (result) client.close()
    return result
  } catch (err) {
    client.close()
    console.log(err.stack)
  }
}

const updating = async (colName, query, id, document) => {
  const client = new MongoClient(url, { useNewUrlParser: true })
  try {
    await client.connect()
    if (id) query._id = new ObjectID(id)
    // console.log(`${JSON.stringify(query)} will update document ${JSON.stringify(document)}`)
    const db = client.db(dbName)
    let result = await db.collection(colName).updateOne(query, { $set: { document } })
    // console.log(`Resultado del update ${result}`)
    if (result) client.close()
    return result
  } catch (err) {
    client.close()
    console.log(err.stack)
  }
}

const deleting = async (colName, query, id) => {
  const client = new MongoClient(url, { useNewUrlParser: true })
  try {
    await client.connect()
    if (id) query._id = new ObjectID(id)
    console.log(`${JSON.stringify(id)} will be delete`)
    const db = client.db(dbName)
    let result = await db.collection(colName).deleteOne(query)
    console.log(`resultado del delete ${result}`)
    if (result) client.close()
    return result
  } catch (err) {
    client.close()
    console.log(err.stack)
  }
}

const aggregating = async (colName, query) => {
  const client = new MongoClient(url, { useNewUrlParser: true })
  try {
    await client.connect()
    console.log(`aggregating`)
    const db = client.db(dbName)
    let result = await db.collection(colName).aggregate(query).toArray()
    if (result) client.close()
    return result
  } catch (err) {
    client.close()
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
