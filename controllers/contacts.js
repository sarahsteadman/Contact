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

const create = async (req, res, next) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);

    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Error! Contact not added.');
    }
};

const update = async (req, res, next) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const idString = String(req.params.id);
    const userId = new ObjectId(idString);
    const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: userId }, contact);

    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error! Contact not updated.');
    }
};

const del = async (req, res, next) => {
    const idString = String(req.params.id);
    const userId = new ObjectId(idString);
    const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId }, true); console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error! Unable to delete!');
    }
};

module.exports = { getAll, getSingle, create, update, del };