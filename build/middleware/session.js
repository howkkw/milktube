"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sessionMiddleware = void 0;

var sessionMiddleware = function sessionMiddleware(req, res, next) {
  res.locals.loggedIn = Boolean(req.session.loggedIn);

  if (res.locals.loggedIn) {
    res.locals.user = req.session.user;
  }

  next();
};

exports.sessionMiddleware = sessionMiddleware;