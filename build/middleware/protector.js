"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userEditProtector = exports.videoModifyProtector = exports.socialProtector = exports.guessProtector = exports.userProtector = void 0;

var _video = _interopRequireDefault(require("../model/video"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userProtector = function userProtector(req, res, next) {
  if (!req.session.loggedIn) {
    req.flash("error", "You are not User!");
    return res.redirect("/");
  }

  next();
};

exports.userProtector = userProtector;

var guessProtector = function guessProtector(req, res, next) {
  if (req.session.loggedIn) {
    req.flash("error", "You are already User.");
    return res.redirect("/");
  }

  next();
};

exports.guessProtector = guessProtector;

var socialProtector = function socialProtector(req, res, next) {
  if (req.session.loggedIn) {
    if (req.session.user.socialOnly) {
      req.flash("error", "You Joined with Social Account!");
      return res.redirect("/");
    }

    next();
  } else {
    req.flash("error", "You are not User!");
    return res.redirect("/");
  }
};

exports.socialProtector = socialProtector;

var videoModifyProtector = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var video;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _video["default"].findById(req.params.id).populate("owner");

          case 2:
            video = _context.sent;

            if (!req.session.loggedIn) {
              _context.next = 10;
              break;
            }

            if (!(String(video.owner._id) !== String(req.session.user._id))) {
              _context.next = 7;
              break;
            }

            req.flash("error", "You are not Video Owner.");
            return _context.abrupt("return", res.redirect("/"));

          case 7:
            next();
            _context.next = 12;
            break;

          case 10:
            req.flash("error", "You are not User!");
            return _context.abrupt("return", res.redirect("/"));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function videoModifyProtector(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.videoModifyProtector = videoModifyProtector;

var userEditProtector = function userEditProtector(req, res, next) {
  if (req.session.loggedIn) {
    if (String(req.params.id) !== String(req.session.user._id)) {
      req.flash("error", "You are not correct User.");
      return res.redirect("/");
    }

    next();
  } else {
    req.flash("error", "You are not User!");
    return res.redirect("/");
  }
};

exports.userEditProtector = userEditProtector;