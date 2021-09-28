"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postEditImg = exports.getEditImg = exports.postPassword = exports.getPassword = exports.postEditProfile = exports.getEditProfile = exports.myProfile = exports.showInnerProfile = exports.showProfile = void 0;

var _user = _interopRequireDefault(require("../model/user"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var showProfile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _context.next = 3;
            return _user["default"].findById(id).populate({
              path: "videos",
              options: {
                sort: {
                  createdAt: "desc"
                }
              },
              populate: {
                path: "owner",
                model: "User"
              }
            });

          case 3:
            user = _context.sent;
            return _context.abrupt("return", res.render("userprofile", {
              pageTitle: "".concat(user.username, "'s Videos"),
              user: user,
              id: id
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function showProfile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.showProfile = showProfile;

var showInnerProfile = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, profileUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return _user["default"].findById(id);

          case 3:
            profileUser = _context2.sent;
            return _context2.abrupt("return", res.render("userinnerprofile", {
              pageTitle: "".concat(profileUser.username, "'s Profile"),
              profileUser: profileUser,
              id: id
            }));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function showInnerProfile(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.showInnerProfile = showInnerProfile;

var myProfile = function myProfile(req, res) {
  return res.render("myprofile", {
    pageTitle: "".concat(res.locals.user.username, "'s Profile")
  });
};

exports.myProfile = myProfile;

var getEditProfile = function getEditProfile(req, res) {
  return res.render("edit-profile", {
    pageTitle: "Edit ".concat(res.locals.user.username, "'s Profile")
  });
};

exports.getEditProfile = getEditProfile;

var postEditProfile = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, username, location, introduction, id, user, _updatedUser, updatedUser;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, location = _req$body.location, introduction = _req$body.introduction;
            id = req.session.user._id;
            _context3.next = 4;
            return _user["default"].findOne({
              username: username
            });

          case 4:
            user = _context3.sent;

            if (!user) {
              _context3.next = 17;
              break;
            }

            if (!(String(user._id) === String(id))) {
              _context3.next = 15;
              break;
            }

            _context3.next = 9;
            return _user["default"].findByIdAndUpdate(id, {
              username: username,
              location: location,
              introduction: introduction
            }, {
              "new": true
            });

          case 9:
            _updatedUser = _context3.sent;
            req.session.user = _updatedUser;
            req.flash("info", "Successfully Edited!");
            return _context3.abrupt("return", res.redirect("/"));

          case 15:
            req.flash("error", "Username is already Exists!");
            return _context3.abrupt("return", res.render("edit-Profile", {
              pageTitle: "Edit ".concat(res.locals.user.username, "'s Profile")
            }));

          case 17:
            _context3.next = 19;
            return _user["default"].findByIdAndUpdate(id, {
              username: username,
              location: location,
              introduction: introduction
            }, {
              "new": true
            });

          case 19:
            updatedUser = _context3.sent;
            req.session.user = updatedUser;
            req.flash("info", "Successfully Edited!");
            return _context3.abrupt("return", res.redirect("/"));

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postEditProfile(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postEditProfile = postEditProfile;

var getPassword = function getPassword(req, res) {
  return res.render("edit-password", {
    pageTitle: "Edit ".concat(res.locals.user.username, "'s Password")
  });
};

exports.getPassword = getPassword;

var postPassword = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, oldPassword, password, password1, oldPasswordConfirm, id, updatedUser;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, oldPassword = _req$body2.oldPassword, password = _req$body2.password, password1 = _req$body2.password1;
            _context4.next = 3;
            return _bcrypt["default"].compare(oldPassword, req.session.user.password);

          case 3:
            oldPasswordConfirm = _context4.sent;
            id = req.session.user._id;

            if (oldPasswordConfirm) {
              _context4.next = 10;
              break;
            }

            req.flash("error", "Password Incorrect");
            return _context4.abrupt("return", res.render("edit-password", {
              pageTitle: "Edit ".concat(res.locals.user.username, "'s Password")
            }));

          case 10:
            if (!(password !== password1)) {
              _context4.next = 13;
              break;
            }

            req.flash("error", "Passwords Confirmation failed");
            return _context4.abrupt("return", res.render("edit-password", {
              pageTitle: "Edit ".concat(res.locals.user.username, "'s Password")
            }));

          case 13:
            _context4.t0 = _user["default"];
            _context4.t1 = id;
            _context4.next = 17;
            return _bcrypt["default"].hash(password, 5);

          case 17:
            _context4.t2 = _context4.sent;
            _context4.t3 = {
              password: _context4.t2
            };
            _context4.next = 21;
            return _context4.t0.findByIdAndUpdate.call(_context4.t0, _context4.t1, _context4.t3);

          case 21:
            updatedUser = _context4.sent;
            req.session.user.password = updatedUser.password;
            req.flash("info", "Successfully Edited!");
            return _context4.abrupt("return", res.redirect("/"));

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function postPassword(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postPassword = postPassword;

var getEditImg = function getEditImg(req, res) {
  return res.render("edit-profileimg", {
    pageTitle: "Edit Img"
  });
};

exports.getEditImg = getEditImg;

var postEditImg = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, file, updatedUser;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            file = req.file;
            _context5.next = 4;
            return _user["default"].findByIdAndUpdate(id, {
              avatarURL: file.location
            }, {
              "new": true
            });

          case 4:
            updatedUser = _context5.sent;
            req.session.user = updatedUser;
            req.flash("info", "Successfully Edited!");
            return _context5.abrupt("return", res.redirect("/user/".concat(id, "/edit")));

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function postEditImg(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postEditImg = postEditImg;