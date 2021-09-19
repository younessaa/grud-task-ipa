const express = require('express');
const app = express();

const mongoose = require('./database/mongoose', {useNewUrlParser: true, useUnifiedTopology: true})

/*app.listen(3000, function(){
    console.log('Server started on port 3000');
});*/

app.listen(3000, () => {
    console.log('Server started on port 3000 great');
});