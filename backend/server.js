const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const app = require('./app');

const port = process.env.PORT || 3001;

mongoose.connect (process.env.MONGO_CONNECTION_URL)
.then(() => console.log('MongoDB Connected!'))

app.listen(port, () => console.log(`Listening on port ${port}`));