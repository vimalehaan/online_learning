const mongoose = require('mongoose');

const app = require('./app');

const port = process.env.PORT || 3001;

mongoose.connect ('mongodb://localhost:27017/onlineLearning')
.then(() => console.log('MongoDB Connected!'))

app.listen(port, () => console.log(`Listening on port ${port}`));