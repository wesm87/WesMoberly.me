
import 'babel-polyfill';

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import passport from 'core/passport';
import schema from 'data/schema';
import Router from 'routes';
import config from 'config';

// eslint-disable-next-line import/no-unresolved, import/extensions
import assets from './assets';

const server = global.server = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
server.use(expressJwt({
  secret: config.get('auth.jwt.secret'),
  credentialsRequired: false,
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  getToken: req => req.cookies.id_token,
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
}));
server.use(passport.initialize());

server.get('/login/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'user_location'],
    session: false,
  }),
);
server.get('/login/facebook/return',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(req.user, config.get('auth.jwt.secret'), { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  },
);

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

function renderView(viewName, data) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const template = require(`./views/${viewName}.pug`);

  return template(data);
}

server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const data = {
      title: '',
      description: '',
      css: '',
      body: '',
      entry: assets.main.js,
    };

    if (process.env.NODE_ENV === 'production') {
      data.trackingId = config.get('analytics.google.trackingId');
    }

    const css = [];
    const context = {
      insertCss(styles) {
        css.push(styles._getCss());
      },
      onSetTitle(value) {
        data.title = value;
      },
      onSetMeta(key, value) {
        data[key] = value;
      },
      onPageNotFound() {
        statusCode = 404;
      },
    };

    await Router.dispatch({ path: req.path, query: req.query, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    res.status(statusCode);
    res.send(renderView('index', data));
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const statusCode = err.status || 500;
  const data = {
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  };
  res.status(statusCode);
  res.send(renderView('error', data));
});

//
// Launch the server
// -----------------------------------------------------------------------------
const serverPort = config.get('server.port');
const serverURL = config.get('server.url');
server.listen(serverPort, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at ${serverURL}`);
});
