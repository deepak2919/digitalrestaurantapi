var express = require('express');
var app = express();
var cors=require('cors')
const loginroute=require('./routes/loginRoutes')
const adminroute=require('./routes/adminRoutes')
const managerroute=require('./routes/managerRoutes')
const outletroute=require('./routes/outletRoutes')
const siteroutes=require('./routes/siteRoutes')
const testroute=require('./routes/testRoute')
const bodyParser = require('body-parser');
const { HubConnectionBuilder } = require('@microsoft/signalr');
require('dotenv').config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/login',loginroute)
app.use('/admin',adminroute)
app.use('/manager',managerroute)
app.use('/outlet',outletroute)
app.use('/site',siteroutes)
app.use('/test',testroute)


// var baseUrl = window.location.origin;
// const connection = new HubConnectionBuilder()
//     .withUrl(window.location.origin+'/chat')
//     .build();

// connection.on('ReceiveMessage', (userId, message) => {
//     // Logic to send message to specific user
// });

// connection.start()
//     .then(() => console.log('SignalR Connected'))
//     .catch(err => console.error('SignalR Connection Error: ', err));

// var server = app.listen(5000, function () {
//     console.log('Server is running..');
// });

const port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log('Server is running..');
});