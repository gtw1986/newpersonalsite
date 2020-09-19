const { Router } = require('express');

const express = require('express'),
      app = express(),
      middleware = require('./middleware'),
      methodOverride = require('method-override'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      cors = require('cors'),
      cookieParser = require('cookie-parser'),
      compression = require('compression'),
      cache = require('express-cache-ctrl'),
      LocalStrategy = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      mongoose = require('mongoose'),
      User = require('./models/user'),
      Post = require('./models/post'),
      multer = require('multer'),
      upload = multer({ dest: 'uploads/'}),
      passport = require('passport');
      require('dotenv').config();

// CONFIG
app.set('view engine', 'ejs');
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(compression());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public', cache.private(3600)));
app.use(methodOverride('_method'));



// SESSION
app.use(require('express-session')({ 
    secret: 'keyboard cat', 
    resave: true, 
    saveUninitialized: true }));

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// LOCALS
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
})

// DB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> {
    console.log('Connected to DB');
  }).catch(err => {
    console.log('Error:' + err.message);
  });;

//ROUTES

const indexRoutes = require('./routes/index');
const blogRoutes = require('./routes/blog');

app.use('/', indexRoutes);
app.use('/blog', blogRoutes);
// SERVER

app.listen(process.env.PORT, (req, res) => {
    console.log('listening on ' + process.env.PORT);
});