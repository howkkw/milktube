"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadVideo = exports.uploadAvatar = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var uploadAvatar = (0, _multer["default"])({
  dest: "uploads/avatar"
});
exports.uploadAvatar = uploadAvatar;
var uploadVideo = (0, _multer["default"])({
  dest: "uploads/video"
});
exports.uploadVideo = uploadVideo;