const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const cors = require('cors');
const port = process.env.PORT || 8080;
const app = express();

// THERE IS NO FAVICON
app.get('/favicon.ico', (req, res) => {
    res.status(404).end();
});

// Use CORS Middleware
app.use(cors({
    origin: '*', // Allow all origins, adjust this if you need more specific control
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

// Parse JSON request bodies
app.use(bodyParser.json());

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
