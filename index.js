require('dotenv').config();
const app = require('express')();
const fs = require('fs');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
let server = require('http').Server(app);

const port = process.env.NODE_PORT ? process.env.NODE_PORT : '7109';
global.__basedir = __dirname + "/";

let studentRouteV1 = require('./routes/v1/student');
let studentblogs = require('./routes/v1/student/blogRoutes')
const studentReview = require('./routes/v1/student/review');

let adminRouteV2 = require('./routes/v2/admin');
let blogs = require('./routes/v2/admin/blogs');


app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


// set ejs view engine
app.set('view engine', 'ejs');

app.use(function (err, req, res, next) {
  return res.send({ "errorCode": "400", "errorMessage": "SOMETHING_WENT_WRONG 1" });
});


app.use('/student', studentRouteV1);
app.use('/student/blogs', studentblogs);

app.use('/v2/admin', adminRouteV2);
app.use('/v2/admin/blogs', blogs);
app.use("/routes/v1/student", studentRouteV1);
app.use("/student/reviews", studentReview);



server.listen(port, function () {
  console.log(`Server now connected on port ${port}.`);
});