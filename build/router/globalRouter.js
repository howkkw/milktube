"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _globalCon = require("../controller/globalCon");

var _protector = require("../middleware/protector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var globalRouter = _express["default"].Router();

globalRouter.get("/", _globalCon.home);
globalRouter.route("/login").all(_protector.guessProtector).get(_globalCon.getLogin).post(_globalCon.postLogin);
globalRouter.get("/logout", _protector.userProtector, _globalCon.getLogout);
globalRouter.route("/join").all(_protector.guessProtector).get(_globalCon.getJoin).post(_globalCon.postJoin);
globalRouter.get("/join/githubstart", _protector.guessProtector, _globalCon.githubStart);
globalRouter.get("/users/githubfinish", _protector.guessProtector, _globalCon.githubFinish);
globalRouter.get("/search", _globalCon.getSearch);
var _default = globalRouter;
exports["default"] = _default;