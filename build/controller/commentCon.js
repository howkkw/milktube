"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editComment = exports.removeComment = exports.postComment = void 0;

var _video = _interopRequireDefault(require("../model/video"));

var _user = _interopRequireDefault(require("../model/user"));

var _comment = _interopRequireDefault(require("../model/comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var postComment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var id, UserID, video, ownerUser, comment;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            UserID = req.session.user._id;
            _context.next = 4;
            return _video["default"].findById(id);

          case 4:
            video = _context.sent;
            _context.next = 7;
            return _user["default"].findById(UserID);

          case 7:
            ownerUser = _context.sent;
            console.log(ownerUser);

            if (video) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", res.sendStatus(400));

          case 13:
            _context.next = 15;
            return _comment["default"].create({
              owner: UserID,
              video: id,
              content: req.body.commentsContent
            });

          case 15:
            comment = _context.sent;
            video.comment.push(comment._id);
            ownerUser.comment.push(comment._id);
            _context.next = 20;
            return video.save();

          case 20:
            _context.next = 22;
            return ownerUser.save();

          case 22:
            return _context.abrupt("return", res.status(200).json({
              commentid: comment._id,
              ownerID: UserID,
              avatarURL: ownerUser.avatarURL,
              username: ownerUser.username
            }));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function postComment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postComment = postComment;

var removeComment = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, commentsID;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            commentsID = req.body.ID;
            _context2.next = 4;
            return _comment["default"].findByIdAndDelete(commentsID);

          case 4:
            return _context2.abrupt("return", res.sendStatus(200));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function removeComment(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.removeComment = removeComment;

var editComment = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, comment;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return _comment["default"].findByIdAndUpdate(id, {
              content: req.body.EditINPUTValue
            }, {
              "new": true
            });

          case 3:
            comment = _context3.sent;

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function editComment(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.editComment = editComment;