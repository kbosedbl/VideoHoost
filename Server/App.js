const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const checkAuth = require('./middlewares/check-auth');

mongoose.connect('mongodb://127.0.0.1/videoServer' , {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/signUp', require('./router/signUp'));
app.use('/api/signIn', require('./router/signIn'));
app.use('/api/delete', require('./router/deleteVideo'));
app.use('/api/upload', checkAuth ,require('./router/Upload'));
app.use('/api/videoList', checkAuth ,require('./router/videoList'));
app.use('/api/myUploads', checkAuth ,require('./router/myUploads'));
app.use('/api/videos', express.static('media/uploads'));
module.exports = app;