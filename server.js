const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var path = require('./routes/router');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require('express-session');

app.use(bodyParser.json());
app.use(express.json());

app.use('/',path);
app.use('/my',path);
app.use('/join',path);
app.use('/question',path);
app.use('/write',path);
app.use('/Read',path);
app.use('/Salereg',path);
app.use('/mycomment',path);
app.use('/chat',path);
app.use('/myup',path);
app.use('/mydel',path);
app.use('/zip',express.static(__dirname+'/zip'));
app.use('/zip',path);
app.use('/search',path);
app.use('/search-writing',path);
app.use('/searchresult',path);
app.use('/sale',path);
app.use('/SaleInfo',path);
app.use('/salecomment',path);
app.use('/saleup',path);
app.use('/saledel',path);
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));



const port = process.env.PORT || 80;

app.listen(port, () => console.log(`Listening on port ${port}`));

