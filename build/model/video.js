"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
  Description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10
  },
  hashtags: [{
    type: String,
    trim: true,
    required: false
  }],
  meta: {
    view: {
      type: Number,
      "default": 0
    },
    rating: {
      type: Number,
      "default": 0
    }
  },
  path: {
    type: String,
    required: true
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    "default": new Date()
  },
  thumbpath: {
    type: String
  },
  comment: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }]
});
videoSchema["static"]("hashtagFormat", function (hashtags) {
  hashtags.split(",").map(function (word) {
    return word.startsWith("#") ? word : "#".concat(word);
  });
});

var Video = _mongoose["default"].model("Video", videoSchema);

var _default = Video;
exports["default"] = _default;