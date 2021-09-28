"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.githubFinish = exports.githubStart = exports.getSearch = exports.postJoin = exports.getJoin = exports.getLogout = exports.postLogin = exports.getLogin = exports.home = void 0;

var _user = _interopRequireDefault(require("../model/user"));

var _video = _interopRequireDefault(require("../model/video"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var videos;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _video["default"].find().populate("owner").sort({
              createdAt: "desc"
            });

          case 2:
            videos = _context.sent;
            return _context.abrupt("return", res.render("home", {
              pageTitle: "HOME",
              videos: videos
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var getLogin = function getLogin(req, res) {
  return res.render("login", {
    pageTitle: "LOGIN"
  });
};

exports.getLogin = getLogin;

var postLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, id, password, userId, passwordConfirm;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, id = _req$body.id, password = _req$body.password;
            _context2.next = 3;
            return _user["default"].findOne({
              id: id
            });

          case 3:
            userId = _context2.sent;

            if (userId) {
              _context2.next = 8;
              break;
            }

            req.flash("error", "Can't find ID");
            req.flash("info", "Welcome come to MILKTUBE!");
            return _context2.abrupt("return", res.render("login", {
              pageTitle: "LOGIN"
            }));

          case 8:
            _context2.next = 10;
            return _bcrypt["default"].compare(password, userId.password);

          case 10:
            passwordConfirm = _context2.sent;

            if (passwordConfirm) {
              _context2.next = 14;
              break;
            }

            req.flash("error", "Incorrect Password");
            return _context2.abrupt("return", res.render("login", {
              pageTitle: "LOGIN"
            }));

          case 14:
            req.session.loggedIn = true;
            req.session.user = userId;
            return _context2.abrupt("return", res.redirect("/"));

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function postLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postLogin = postLogin;

var getLogout = function getLogout(req, res) {
  req.flash("info", "Bye Bye! I'll miss you!");
  req.session.destroy();
  return res.redirect("/");
};

exports.getLogout = getLogout;

var getJoin = function getJoin(req, res) {
  req.flash("info", "Password will be Safely encrypted ");
  return res.render("join", {
    pageTitle: "JOIN"
  });
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body2, id, email, password1, password2, location, username, findID, findUsername, findEMAIL, user;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, id = _req$body2.id, email = _req$body2.email, password1 = _req$body2.password1, password2 = _req$body2.password2, location = _req$body2.location, username = _req$body2.username;
            _context3.next = 3;
            return _user["default"].findOne({
              id: id
            });

          case 3:
            findID = _context3.sent;
            _context3.next = 6;
            return _user["default"].findOne({
              username: username
            });

          case 6:
            findUsername = _context3.sent;
            _context3.next = 9;
            return _user["default"].findOne({
              email: email
            });

          case 9:
            findEMAIL = _context3.sent;

            if (!findID) {
              _context3.next = 13;
              break;
            }

            req.flash("error", "ID is already Exists!");
            return _context3.abrupt("return", res.render("join", {
              pageTitle: "JOIN",
              id: id,
              email: email,
              location: location,
              username: username
            }));

          case 13:
            if (!findUsername) {
              _context3.next = 16;
              break;
            }

            req.flash("error", "Username is already Exsits!");
            return _context3.abrupt("return", res.render("join", {
              pageTitle: "JOIN",
              id: id,
              email: email,
              location: location,
              username: username
            }));

          case 16:
            if (!findEMAIL) {
              _context3.next = 19;
              break;
            }

            req.flash("error", "EMAIL is already Exsits!");
            return _context3.abrupt("return", res.render("join", {
              pageTitle: "JOIN",
              id: id,
              email: email,
              location: location,
              username: username
            }));

          case 19:
            if (!(password1 !== password2)) {
              _context3.next = 22;
              break;
            }

            req.flash("error", "Passwords are not same!");
            return _context3.abrupt("return", res.render("join", {
              pageTitle: "JOIN",
              id: id,
              email: email,
              location: location,
              username: username
            }));

          case 22:
            _context3.next = 24;
            return _user["default"].create({
              username: username,
              email: email,
              password: password1,
              location: location,
              id: id
            });

          case 24:
            user = _context3.sent;
            req.session.user = user;
            req.session.loggedIn = true;
            req.flash("Welcome come to MILKTUBE!");
            return _context3.abrupt("return", res.redirect("/"));

          case 29:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postJoin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getSearch = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var keyword, videos, regex;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            keyword = req.query.keyword;
            videos = [];
            regex = new RegExp(keyword, "gi");

            if (!keyword) {
              _context4.next = 7;
              break;
            }

            _context4.next = 6;
            return _video["default"].find({
              title: {
                $regex: new RegExp(keyword, "i")
              }
            }).populate("owner");

          case 6:
            videos = _context4.sent;

          case 7:
            return _context4.abrupt("return", res.render("search", {
              pageTitle: "SEARCH",
              videos: videos
            }));

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getSearch(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getSearch = getSearch;

var githubStart = function githubStart(req, res) {
  var config = {
    client_id: process.env.CLIENT_ID,
    scope: "read:user user:email",
    allow_signup: false
  };
  var url = "https://github.com/login/oauth/authorize";
  var configURL = new URLSearchParams(config).toString();
  var finalURL = "".concat(url, "?").concat(configURL);
  return res.redirect(finalURL);
};

exports.githubStart = githubStart;

var githubFinish = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var url, config, configURL, finalURL, TOKEN, _url, access_token, data, emailData, email, realEmail, findEmail, user;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            url = "https://github.com/login/oauth/access_token";
            config = {
              client_id: process.env.CLIENT_ID,
              client_secret: CLIENT_SECRET,
              code: req.query.code
            };
            configURL = new URLSearchParams(config).toString();
            finalURL = "".concat(url, "?").concat(configURL);
            _context5.next = 6;
            return (0, _nodeFetch["default"])(finalURL, {
              method: "POST",
              headers: {
                Accept: "application/json"
              }
            });

          case 6:
            _context5.next = 8;
            return _context5.sent.json();

          case 8:
            TOKEN = _context5.sent;

            if (!("access_token" in TOKEN)) {
              _context5.next = 42;
              break;
            }

            _url = "https://api.github.com/user";
            access_token = TOKEN.access_token;
            _context5.next = 14;
            return (0, _nodeFetch["default"])(_url, {
              headers: {
                Authorization: "token ".concat(access_token)
              }
            });

          case 14:
            _context5.next = 16;
            return _context5.sent.json();

          case 16:
            data = _context5.sent;
            _context5.next = 19;
            return (0, _nodeFetch["default"])("".concat(_url, "/emails"), {
              headers: {
                Authorization: "token ".concat(access_token)
              }
            });

          case 19:
            _context5.next = 21;
            return _context5.sent.json();

          case 21:
            emailData = _context5.sent;
            email = emailData.find(function (email) {
              return email.primary === true && email.verified === true;
            });
            realEmail = email.email;
            _context5.next = 26;
            return _user["default"].findOne({
              email: realEmail
            });

          case 26:
            findEmail = _context5.sent;

            if (!email) {
              _context5.next = 42;
              break;
            }

            if (findEmail) {
              _context5.next = 38;
              break;
            }

            _context5.next = 31;
            return _user["default"].create({
              id: "".concat(data.login).concat(data.node_id),
              avatarURL: data.avatar_url,
              socialOnly: true,
              username: "GitHub".concat(data.id),
              location: data.location,
              email: realEmail,
              password: ""
            });

          case 31:
            user = _context5.sent;
            req.flash("info", "Welcome come to MILKTUBE!");
            req.session.user = user;
            req.session.loggedIn = true;
            return _context5.abrupt("return", res.redirect("/"));

          case 38:
            req.session.user = findEmail;
            req.session.loggedIn = true;
            req.flash("info", "You already joined to MILKTUBE!");
            return _context5.abrupt("return", res.redirect("/"));

          case 42:
            req.flash("error", "Failed to join with Social Account.");
            return _context5.abrupt("return", res.redirect("/"));

          case 44:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function githubFinish(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.githubFinish = githubFinish;