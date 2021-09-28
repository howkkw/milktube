"use strict";

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var playBtn = document.getElementById("playBtn");
var playBtnIcon = playBtn.querySelector("i");
var muteBtn = document.getElementById("muteBtn");
var muteBtnIcon = muteBtn.querySelector("i");
var volumeBar = document.getElementById("volumeBar");
var currentTime = document.getElementById("currentTime");
var durationTime = document.getElementById("durationTime");
var video = document.querySelector("video");
var timeLine = document.getElementById("timeLine");
var fullscreenBtn = document.getElementById("fullscreenBtn");
var fullscreenBtnIcon = fullscreenBtn.querySelector("i");
var videoContainer = document.querySelector(".videoContainer");
var controls = document.querySelector(".controls");
var commentsInput = document.querySelector("#comments input");
var Volume = 0.5;
video.volume = Volume;
var leaveTimeOUT;
var TIMEOUT;

var handlePlayBtn = function handlePlayBtn() {
  if (video.paused) {
    video.play();
    playBtnIcon.className = "fas fa-pause";
  } else {
    video.pause();
    playBtnIcon.className = "fas fa-play";
  }
};

var handleMuteBtn = function handleMuteBtn() {
  if (video.muted) {
    muteBtnIcon.className = "fas fa-volume-up";
    video.muted = false;
  } else {
    muteBtnIcon.className = "fas fa-volume-mute";
    video.muted = true;
  }

  volumeBar.value = video.muted ? 0 : Volume;
};

var handleInput = function handleInput(event) {
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.className = "fas fa-volume-up";
  }

  Volume = event.target.value;
  video.volume = event.target.value;
};

new Date().toISOString().substr(11, 8);

var handleLoadedMetaData = function handleLoadedMetaData() {
  durationTime.innerText = new Date(Math.floor(video.duration) * 1000).toISOString().substr(14, 5);
  timeLine.max = Math.floor(video.duration);
};

var handleTimeUpdate = function handleTimeUpdate() {
  timeLine.value = Math.floor(video.currentTime);
  currentTime.innerText = new Date(Math.floor(video.currentTime) * 1000).toISOString().substr(14, 5);
};

var handleVideoInput = function handleVideoInput(event) {
  video.currentTime = event.target.value;
};

var handleFullscreen = function handleFullscreen() {
  if (!document.fullscreen) {
    videoContainer.requestFullscreen();
    fullscreenBtnIcon.className = "fas fa-compress";
  } else {
    document.exitFullscreen();
    fullscreenBtnIcon.className = "fas fa-expand";
  }
};

var handleESC = function handleESC() {
  if (!document.fullscreen) {
    fullscreenBtnIcon.className = "fas fa-expand";
  } else {
    fullscreenBtnIcon.className = "fas fa-compress";
  }
};

var handleKeyDown = function handleKeyDown(event) {
  if (event.keyCode === 13) {
    if (document.activeElement.type !== "text") {
      handleFullscreen();
    }
  }

  if (event.keyCode === 32) {
    if (document.activeElement.type !== "text") {
      handlePlayBtn();
      event.preventDefault();
    }
  }

  if (event.keyCode === 39 && video.currentTime >= video.duration - 5) {
    video.currentTime = video.duration;
    playBtnIcon.className = "fas fa-play";
  }

  if (event.keyCode === 39 && video.currentTime < video.duration - 5) {
    video.currentTime = video.currentTime + 5;
  }

  if (event.keyCode === 37 && video.currentTime <= 5) {
    video.currentTime = 0;
  }

  if (event.keyCode === 37 && video.currentTime > 5) {
    video.currentTime = video.currentTime - 5;
  }

  if (event.keyCode === 37 && video.currentTime === video.duration) {
    video.currentTime = video.currentTime - 5;
    video.play();
  }
};

var handleControls = function handleControls() {
  clearTimeout(leaveTimeOUT);
  controls.classList.add("showing");

  if (TIMEOUT) {
    clearTimeout(TIMEOUT);
  }

  TIMEOUT = setTimeout(function () {
    controls.classList.remove("showing");
  }, 2000);
};

var handleControlsLeave = function handleControlsLeave() {
  leaveTimeOUT = setTimeout(function () {
    controls.classList.remove("showing");
  }, 2000);
};

playBtn.addEventListener("click", handlePlayBtn);
video.addEventListener("click", handlePlayBtn);
muteBtn.addEventListener("click", handleMuteBtn);
volumeBar.addEventListener("input", handleInput);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
timeLine.addEventListener("input", handleVideoInput);
fullscreenBtn.addEventListener("click", handleFullscreen);
document.addEventListener("fullscreenchange", handleESC);
document.addEventListener("keydown", handleKeyDown);

var handleView = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee() {
    var id;
    return _regeneratorRuntime["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = video.dataset.id;
            _context.next = 3;
            return fetch("/video/".concat(id, "/api"), {
              method: "POST"
            });

          case 3:
            playBtnIcon.className = "fas fa-play";

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleView() {
    return _ref.apply(this, arguments);
  };
}();

video.addEventListener("ended", handleView);
video.addEventListener("dblclick", handleFullscreen);
video.addEventListener("mousemove", handleControls);
video.addEventListener("mouseleave", handleControlsLeave);
var comments = document.getElementById("comments");
var commentsText = comments.querySelector("input");
var videoId = video.dataset.id;

var fetchComment = function fetchComment(event) {
  event.preventDefault();
};

comments.addEventListener("submit", fetchComment);