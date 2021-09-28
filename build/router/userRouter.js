"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userCon = require("../controller/userCon");

var _protector = require("../middleware/protector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.get("/:id([0-9a-f]{24})", _userCon.showProfile);
userRouter.get("/:id([0-9a-f]{24})/profile", _userCon.showInnerProfile);
userRouter.route("/:id([0-9a-f]{24})/edit").all(_protector.userEditProtector).get(_userCon.getEditProfile).post(_userCon.postEditProfile);
userRouter.route("/:id([0-9a-f]{24})/edit/password").all(_protector.userEditProtector, _protector.socialProtector).get(_userCon.getPassword).post(_userCon.postPassword);
userRouter.route("/:id([0-9a-f]{24})/edit/profile-image").all(_protector.userEditProtector).get(_userCon.getEditImg).post(_userCon.postEditImg);
var _default = userRouter;
exports["default"] = _default;