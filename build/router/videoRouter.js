"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoCon = require("../controller/videoCon");

var _protector = require("../middleware/protector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router();

videoRouter.get("/:id([0-9a-f]{24})", _videoCon.getWatch);
videoRouter.get("/:id([0-9a-f]{24})/remove", _protector.videoModifyProtector, _videoCon.getRemove);
videoRouter.route("/upload").all(_protector.userProtector).get(_videoCon.getUpload).post(_videoCon.postUpload);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(_protector.videoModifyProtector).get(_videoCon.getEdit).post(_videoCon.postEdit);
videoRouter.route("/:id([0-9a-f]{24})/edit/video").all(_protector.videoModifyProtector).get(_videoCon.getVideoEdit).post(_videoCon.postVideoEdit);
videoRouter.route("/:id([0-9a-f]{24})/edit/thumb").all(_protector.videoModifyProtector).get(_videoCon.getVideoThumbnail).post(_videoCon.postVideoThumbnail);
var _default = videoRouter;
exports["default"] = _default;