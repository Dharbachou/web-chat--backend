const express = require('express');
const conf = require('./config/config');

/** system vars*/
const port = conf.app.port;
/** end */

const app = express();

app.get('/', (req, res) => {
   return res.send('Home page');
});

app.get('/', (req, res) => {
   return res.send('Login screen works now');
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});