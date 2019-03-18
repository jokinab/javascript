'use strict'

const client = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017/backedge'

function connecting () {
  let ejecutor = function (resolve, reject) {
    client.connect(url, { useNewUrlParser: true }, (err, db) => err ? reject(err) : resolve(db))
  }
  return new Promise(ejecutor)
}

function colConnecting (colName) {
  return new Promise((resolve, reject) => {
    client.connect(url, { useNewUrlParser: true }, (err, db) => err ? reject(err) : resolve(db.collection(colName)))
  })
}

function finding (colName, query, id) {
  return new Promise((resolve, reject) => {
    if (id) query._id = new ObjectID(id)
    this.colConnecting(colName)
      .then(colDb => colDb.find(query).toArray((err, result) => err ? reject(err) : resolve(result)))
      .catch(err => reject(err))
  })
}

function inserting (colName, document) {
  return new Promise((resolve, reject) => {
    this.colConnecting(colName)
      .then(colDb => colDb.insert(document, (err, result) => err ? reject(err) : resolve(result)))
      .catch(err => reject(err))
  })
}

function updating (colName, query, id, document) {
  return new Promise((resolve, reject) => {
    if (id) query._id = new ObjectID(id)
    this.colConnecting(colName)
      .then(colDb => colDb.update(query, document, (err, result) => err ? reject(err) : resolve(result)))
      .catch(err => reject(err))
  })
}

function deleting (colName, query, id) {
  return new Promise((resolve, reject) => {
    if (id) query._id = new ObjectID(id)
    this.colConnecting(colName)
      .then(colDb => colDb.deleteOne(query, (err, result) => err ? reject(err) : resolve(result)))
      .catch(err => reject(err))
  })
}

function aggregating (colName, query) {
  return new Promise((resolve, reject) => {
    this.colConnecting(colName)
      .then(colDb => colDb.aggregate(query).toArray((err, result) => err ? reject(err) : resolve(result)))
      .catch(err => reject(err))
  })
}

module.exports = {
  connecting: connecting,
  colConnecting: colConnecting,
  finding: finding,
  inserting: inserting,
  updating: updating,
  deleting: deleting,
  aggregating: aggregating
}
