

const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      cors = require('cors'),
      cookieParser = require('cookie-parser');
      require('dotenv').config();

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public', { maxage: '1h' }));

app.get('/', (req, res) => {
    console.log(req.headers);
    res.render('resume');
});

app.get('/resume', (req, res) => {
    console.log(req.headers);
    res.render('resume');
})

app.get('/projects', (req, res) => {
    res.render('projects');
})

app.listen(process.env.PORT, (req, res) => {
    console.log('listening on ' + process.env.PORT);
});