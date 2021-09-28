"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVideoThumbnail = exports.postVideoThumbnail = exports.apiCon = exports.postVideoEdit = exports.getVideoEdit = exports.postUpload = exports.getUpload = exports.postEdit = exports.getEdit = exports.getRemove = exports.getWatch = void 0;

var _user = _interopRequireDefault(require("../model/user"));

var _video = _interopRequireDefault(require("../model/video"));

var _ffmpeg = _interopRequireDefault(require("ffmpeg"));

var _comment = _interopRequireDefault(require("../model/comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getWatch = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var id, video, comments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _context.next = 3;
            return _video["default"].findById(id).populate("owner");

          case 3:
            video = _context.sent;
            _context.next = 6;
            return _comment["default"].find({
              video: id
            }).populate("owner");

          case 6:
            comments = _context.sent;
            return _context.abrupt("return", res.render("watch", {
              pageTitle: "".concat(video.title),
              video: video,
              id: id,
              comments: comments
            }));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getWatch(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getWatch = getWatch;

var getRemove = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return _video["default"].findByIdAndDelete(id);

          case 3:
            req.flash("info", "Successfully Removed!");
            return _context2.abrupt("return", res.redirect("/"));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getRemove(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getRemove = getRemove;

var getEdit = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return _video["default"].findById(id);

          case 3:
            video = _context3.sent;
            return _context3.abrupt("return", res.render("edit", {
              pageTitle: "EDIT ".concat(video.title),
              video: video
            }));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getEdit(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getEdit = getEdit;

var postEdit = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var file, _req$body, title, Description, hashtags, id;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            file = req.file, _req$body = req.body, title = _req$body.title, Description = _req$body.Description, hashtags = _req$body.hashtags, id = req.params.id;

            if (!file) {
              _context4.next = 6;
              break;
            }

            _context4.next = 4;
            return _video["default"].findByIdAndUpdate(id, {
              title: title,
              Description: Description,
              hashtags: hashtags.split(",").map(function (a) {
                return a.startsWith("#") ? a : "#".concat(a);
              }),
              path: file.location
            }, {
              "new": true
            });

          case 4:
            _context4.next = 8;
            break;

          case 6:
            _context4.next = 8;
            return _video["default"].findByIdAndUpdate(id, {
              title: title,
              Description: Description,
              hashtags: hashtags.split(",").map(function (a) {
                return a.startsWith("#") ? a : "#".concat(a);
              })
            }, {
              "new": true
            });

          case 8:
            req.flash("info", "Successfully Edited!");
            return _context4.abrupt("return", res.redirect("/video/".concat(id)));

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function postEdit(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postEdit = postEdit;

var getUpload = function getUpload(req, res) {
  return res.render("upload", {
    pageTitle: "UPLOAD"
  });
};

exports.getUpload = getUpload;

var postUpload = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var files, _req$body2, title, Description, hashtags, user, thumbnail, video, userVideo;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            files = req.files, _req$body2 = req.body, title = _req$body2.title, Description = _req$body2.Description, hashtags = _req$body2.hashtags, user = req.session.user;
            console.log(files);
            _context5.next = 4;
            return _video["default"].create({
              path: files.video[0].location,
              title: title,
              Description: Description,
              thumbpath: files.image[0].location,
              hashtags: hashtags.split(",").map(function (a) {
                return a.startsWith("#") ? a : "#".concat(a);
              }),
              owner: user._id
            });

          case 4:
            video = _context5.sent;
            req.flash("info", "Successfully Uploaded!");
            _context5.next = 8;
            return _user["default"].findById(user._id);

          case 8:
            userVideo = _context5.sent;
            userVideo.videos.push(video._id);
            userVideo.save();
            return _context5.abrupt("return", res.redirect);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function postUpload(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postUpload = postUpload;

var getVideoEdit = function getVideoEdit(req, res) {
  req.flash("info", "If you change Video or Thumbnail, Click the Button ");
  return res.render("videoEdit", {
    pageTitle: "Edit Video File"
  });
};

exports.getVideoEdit = getVideoEdit;

var postVideoEdit = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, file, updatedVideo;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            file = req.file;
            _context6.next = 4;
            return _video["default"].findByIdAndUpdate(id, {
              path: file.location
            }, {
              "new": true
            });

          case 4:
            updatedVideo = _context6.sent;
            req.flash("info", "Successfully Edited!");
            return _context6.abrupt("return", res.redirect("/video/".concat(id, "/edit")));

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function postVideoEdit(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postVideoEdit = postVideoEdit;

var apiCon = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.next = 3;
            return _video["default"].findById(id);

          case 3:
            video = _context7.sent;
            video.meta.view = video.meta.view + 1;
            _context7.next = 7;
            return video.save();

          case 7:
            if (video) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt("return", res.sendStatus(400));

          case 9:
            return _context7.abrupt("return", res.sendStatus(200));

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function apiCon(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.apiCon = apiCon;

var postVideoThumbnail = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var id, file, updatedVideo;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            file = req.file;
            _context8.next = 4;
            return _video["default"].findByIdAndUpdate(id, {
              thumbpath: file.location
            }, {
              "new": true
            });

          case 4:
            updatedVideo = _context8.sent;
            req.flash("info", "Successfully Edited!");
            return _context8.abrupt("return", res.redirect("/video/".concat(id, "/edit")));

          case 7:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function postVideoThumbnail(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.postVideoThumbnail = postVideoThumbnail;

var getVideoThumbnail = function getVideoThumbnail(req, res) {
  return res.render("thumbnailedit", {
    pageTitle: "Edit Video Thumbnail"
  });
};

exports.getVideoThumbnail = getVideoThumbnail;