const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

/**
 * Routerの読み込み
 */
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const todosRouter = require('./routes/todos');

/**
 * モデルの読み込み
 */
const User = require('./models/user');
const Todo = require('./models/todo');

User.sync()
    .then(() => {
      Todo.belongsTo(User, {foreignKey: 'username'});
      Todo.sync();
    });

/**
 * CSRF脆弱性対策
 */
app.all('*', (req, res, next) => {
  if (req.headers.origin && req.headers.origin !== (process.env.ORIGIN || 'http://localhost:3000'))
    res.send('invalid origin');
  else
    next();
});

/**
 * エンジンの設定
 */
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(session({
                  secret           : process.env.SECRET || require('./config.json').secret,
                  resave           : false,
                  saveUninitialized: false
                }));
app.use(passport.initialize());
app.use(passport.session());

const limiter = rateLimit({
                            max    : 60,
                            message: JSON.stringify({error: 'too many requests'})
                          });
app.use(limiter);

/**
 * 認証
 */
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session      : false
  },
  async (username, password, done) => {
    const user = await User.findByPk(username);

    if (user && await bcrypt.compare(password, user.password))
      return done(null, username);
    else
      return done(null, false);
  }
));

/**
 * Routerの設定
 */
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/todos', todosRouter);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

module.exports = app;
