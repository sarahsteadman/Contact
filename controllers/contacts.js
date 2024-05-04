const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res, next) => {
    const contacts = await mongodb.getDb().db().collection('contacts').find();

    // Make contacts an array, wait for promise, then inform the browser that the content type is an array
    // Setting status to 200 indicates that the request was successful
    contacts.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });

};

const getSingle = async (req, res, next) => {

    const idString = String(req.params.id);
    const userId = new ObjectId(idString);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });

    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};



module.exports = { getAll, getSingle };