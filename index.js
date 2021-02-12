const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const conf = require('./config');
const router = require('./router');

/** system vars*/
const port = conf.app.port;
/** end */

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(router);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));

app.get('/', (req, res) => {
   return res.send('Home page');
});

app.get('/', (req, res) => {
   return res.send('Login screen works now');
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});