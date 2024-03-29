const express = require('express');
const { connectDb } = require('./db/mongoose');
const itemRouter = require('./routes/itemRouter');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(itemRouter);
const port = process.env.EXPRESS_PORT || 3001;

const server = app.listen(port, () => {
    console.log(`Web server started on port ${port}!`);
    connectDb();
});

module.exports = {
    app,
    server
};

