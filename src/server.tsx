/**
 * Server-side entry point.
 */

// tslint:disable:no-console

import 'babel-polyfill';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';

import * as path from 'path';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as expressJwt from 'express-jwt';
import * as expressGraphQL from 'express-graphql';
import * as jwt from 'jsonwebtoken';
import * as PrettyError from 'pretty-error';

import passport from 'core/passport';
import schema from 'data/schema';
import config from 'config';

import App from 'components/App';


const server = express();
const assets = require('./assets') as AssetsJSON;

function renderView(viewName: string, data: ViewTemplateData): string {
  const templateData = Object.assign({}, data, { assets });
  const renderTemplate = require(`./views/${viewName}.pug`) as RenderTemplate;

  return renderTemplate(templateData);
}

function renderApp(req, context) {
  return renderToString(
    <ServerRouter
      location={req.url}
      context={context}
    >
      <App />
    </ServerRouter>
  );
}


// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());


// Authentication
// -----------------------------------------------------------------------------
server.use(expressJwt({
  secret: config.get('auth.jwt.secret'),
  credentialsRequired: false,
  getToken: req => req.cookies.id_token,
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


// Register API middleware
// -----------------------------------------------------------------------------
server.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));


// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    const context = createServerRenderContext();
    const data = {
      body: renderApp(req, context),
    };
    const result = context.getResult();

    if (result.redirect) {
      res.writeHead(301, {
        Location: result.redirect.pathname,
      });
      res.end();
    } else {

      // the result will tell you if there were any misses, if so
      // we can send a 404 and then do a second render pass with
      // the context to clue the <Miss> components into rendering
      // this time (on the client they know from componentDidMount)
      if (result.missed) {
        res.writeHead(404);
        data.body = renderApp(req, context);
      }

      res.write(renderView('index', data));
      res.end();
    }
  } catch (err) {
    next(err);
  }
});


// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

const errorMiddleware: express.ErrorMiddleware = (err, req, res, next) => {
  console.log(pe.render(err));
  const statusCode = err.status || 500;
  const data = {
    error: {
      status: statusCode,
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
    },
  };
  res.status(statusCode);
  res.send(renderView('error', data));
};

server.use(errorMiddleware);


// Launch the server
// -----------------------------------------------------------------------------
const serverPort = config.get('server.port');
const serverURL = config.get('server.url');
server.listen(serverPort, () => {
  // eslint-disable-next-line no-console
  console.log(`The server is running at ${serverURL}`);
});
