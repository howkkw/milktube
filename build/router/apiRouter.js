"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoCon = require("../controller/videoCon");

var _commentCon = require("../controller/commentCon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = _express["default"].Router();

apiRouter.post("/video/:id/api", _videoCon.apiCon);
apiRouter.post("/video/:id/comment/write", _commentCon.postComment);
apiRouter.post("/video/:id/comment/delete", _commentCon.removeComment);
apiRouter.post("/video/:id/comment/edit", _commentCon.editComment);
var _default = apiRouter;
exports["default"] = _default;