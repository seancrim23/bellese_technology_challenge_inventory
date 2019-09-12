const express = require('express');
const { connectDb } = require('./db/mongoose');
const itemRouter = require('./routes/itemRouter');

const app = express();
app.use(express.json());
app.use(itemRouter);
const port = process.env.EXPRESS_PORT || 3001;

app.listen(port, () => {
    console.log(`Web server started on port ${port}!`);
    connectDb();
});

