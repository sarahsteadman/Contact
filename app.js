const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT || 8080;
const app = express();

// THERE IS NO FAVICON
app.get('/favicon.ico', (req, res) => {
    res.status(404).end();
});

// Parse JSON request bodies
app.use(bodyParser.json());

// Set up CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Mount routes
app.use('/', require('./routes'));

// Initialize Database and confirm connection
mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to MongoDB and listening on ${port}`);
    }
});
