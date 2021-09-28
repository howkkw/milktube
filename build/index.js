"use strict";

require("dotenv/config");

require("regenerator-runtime");

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _globalRouter = _interopRequireDefault(require("./router/globalRouter"));

var _userRouter = _interopRequireDefault(require("./router/userRouter"));

var _videoRouter = _interopRequireDefault(require("./router/videoRouter"));

var _apiRouter = _interopRequireDefault(require("./router/apiRouter"));

require("./db");

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _session = require("./middleware/session");

var _upload = require("./middleware/upload");

var _expressFlash = _interopRequireDefault(require("express-flash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = 3900;

var handleServerListening = function handleServerListening() {
  return console.log("Server is successfully Listening on http://localhost:".concat(PORT, "\u26A1"));
};

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  "extends": true
}));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use((0, _morgan["default"])("tiny"));
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: _connectMongo["default"].create({
    mongoUrl: "mongodb://127.0.0.1:27017/wetube"
  })
}));
app.use(_session.sessionMiddleware);
app.use((0, _expressFlash["default"])());
app.post("/user/:id([0-9a-f]{24})/edit/profile-image", _upload.uploadAvatar.single("image"));
app.post("/video/upload", _upload.uploadVideo.single("video"));
app.post("/video/:id([0-9a-f]{24})/edit/video", _upload.uploadVideo.single("video"));
app.post("/video/:id([0-9a-f]{24})/edit/thumb", _upload.uploadVideo.single("image"));
app.use("/uploads", _express["default"]["static"]("uploads"));
app.use("/asset", _express["default"]["static"]("asset"));
app.use("/", _globalRouter["default"]);
app.use("/user", _userRouter["default"]);
app.use("/video", _videoRouter["default"]);
app.use("/", _apiRouter["default"]);
app.listen(PORT, handleServerListening);