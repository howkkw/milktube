"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadVideo = exports.uploadAvatar = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var s3 = new _awsSdk["default"].S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
  }
});
var multerUploaderAvatar = (0, _multerS["default"])({
  s3: s3,
  bucket: "milktube/image",
  acl: "public-read"
});
var multerUploaderVideo = (0, _multerS["default"])({
  s3: s3,
  bucket: "milktube/video",
  acl: "public-read"
});
var uploadAvatar = (0, _multer["default"])({
  dest: "uploads/avatar",
  storage: multerUploaderAvatar,
  limits: {
    fileSize: 3000000
  }
});
exports.uploadAvatar = uploadAvatar;
var uploadVideo = (0, _multer["default"])({
  dest: "uploads/video",
  storage: multerUploaderVideo,
  limits: {
    fileSize: 10000000
  }
});
exports.uploadVideo = uploadVideo;