const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));


// app.use(express.urlencoded({extended: false}));
// app.use(express.json());

// app.get('/', (req, res) => {
//   console.log(req.query);
//   console.log(req.body);
//   console.log(req.headers);
//   console.log(req.params);

//   res.send("Getting root!");
//   res.status(404).send('Not found!');
// });



app.listen(3000);