"use strict";

require("../scss/styles.scss");

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var comments = document.getElementById("comments");
var commentsText = comments.querySelector("input");
var video = document.querySelector("video");
var videoId = video.dataset.id;
var commentsBtn = comments.querySelector("button");
var deleteICON = document.querySelectorAll("#deleteICON");
var editICON = document.querySelectorAll("#editICON");
var replyICON = document.querySelectorAll("#replyICON");

var editComment = function editComment(event) {
  var ID = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.id;
  var selectedCommentsBox = document.querySelector("[data-id=\"".concat(ID, "\"]"));
  var CommentCotentedit = selectedCommentsBox.querySelector("#CommentContent");
  var removeElement = selectedCommentsBox.querySelector("#ICON");
  var iconBox = selectedCommentsBox.querySelector("#CommentIcon");
  var parent = event.target.parentElement.parentElement.parentElement.parentElement;
  removeElement.remove();
  var spanValue = CommentCotentedit.querySelector("span").innerText;
  CommentCotentedit.querySelector("span").remove();
  var input = document.createElement("input");
  input.id = "editCommentInput";
  input.type = "text";
  input.value = spanValue;
  input.required = true;
  CommentCotentedit.appendChild(input);
  var span = document.createElement("span");
  var icon = document.createElement("i");
  icon.className = "far fa-check-square";
  icon.id = "editICON";
  var div = document.createElement("div");
  div.id = "ICON";
  iconBox.prepend(div);
  div.appendChild(span);
  span.appendChild(icon);
  icon.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee() {
    var EditINPUT, EditINPUTValue;
    return _regeneratorRuntime["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            EditINPUT = parent.querySelector("#editCommentInput");
            EditINPUTValue = EditINPUT.value;
            location.reload();
            _context.next = 5;
            return fetch("/video/".concat(ID, "/comment/edit"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                EditINPUTValue: EditINPUTValue
              })
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
};

var deleteComment = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee2(event) {
    var ID, selectedCommentsBox;
    return _regeneratorRuntime["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ID = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.id;
            _context2.next = 3;
            return fetch("/video/".concat(videoId, "/comment/delete"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                ID: ID
              })
            });

          case 3:
            selectedCommentsBox = document.querySelector("[data-id=\"".concat(ID, "\"]"));
            selectedCommentsBox.remove();

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function deleteComment(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var fetchComment = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee3(event) {
    var commentsContent, response, json, img, divBox, BoxColumn, a, Writer, span, divContent, divContent2, ContentSpan, divIcon, divIcon2, span3, icon2, span4, remainTime;
    return _regeneratorRuntime["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            event.preventDefault();
            commentsContent = commentsText.value;
            _context3.next = 4;
            return fetch("/video/".concat(videoId, "/comment/write"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                commentsContent: commentsContent
              })
            });

          case 4:
            response = _context3.sent;
            _context3.next = 7;
            return response.json();

          case 7:
            json = _context3.sent;
            commentsText.value = "";

            if (response.status === 200) {
              divBox = document.createElement("div");
              divBox.dataset.id = json.commentid;
              divBox.id = "commentsBox";
              BoxColumn = document.createElement("div");
              BoxColumn.id = "commentsColumn";
              a = document.createElement("a");
              a.href = "/user/".concat(json.ownerID);
              Writer = document.createElement("div");
              Writer.id = "commentsWriter";

              if (json.avatarURL) {
                img = document.createElement("img");
                img.src = "/".concat(json.avatarURL);
              } else {
                img = document.createElement("span");
                img.innerText = "😀";
              }

              span = document.createElement("span");
              span.innerText = json.username;
              divContent = document.createElement("div");
              divContent.id = "commentsContent";
              divContent2 = document.createElement("span");
              divContent2.id = "CommentContent";
              ContentSpan = document.createElement("span");
              ContentSpan.innerText = commentsContent;
              divIcon = document.createElement("div");
              divIcon.id = "CommentIcon";
              divIcon2 = document.createElement("div");
              divIcon2.id = "ICON";
              span3 = document.createElement("span");
              icon2 = document.createElement("i");
              icon2.className = "fas fa-edit";
              span3.id = "editICON";
              span4 = document.createElement("span");
              span4.innerText = "❌";
              remainTime = document.createElement("div");
              remainTime.innerText = "방금 전";
              remainTime.id = "time-remaining";
              commentsContainer.prepend(divBox);
              divBox.appendChild(BoxColumn);
              BoxColumn.appendChild(a);
              a.appendChild(Writer);
              Writer.appendChild(img);
              Writer.appendChild(span);
              BoxColumn.appendChild(divContent);
              divContent.appendChild(divContent2);
              divContent.appendChild(divIcon);
              divContent2.appendChild(ContentSpan);
              divIcon.append(divIcon2);
              divIcon.appendChild(remainTime);
              divIcon2.appendChild(span3);
              divIcon2.appendChild(span4);
              span4.id = "deleteICON";
              span3.appendChild(icon2);
              icon2.addEventListener("click", editComment);
              span4.addEventListener("click", deleteComment);
            }

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function fetchComment(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

commentsBtn.addEventListener("click", fetchComment);
deleteICON.forEach(function (ICON) {
  ICON.addEventListener("click", deleteComment);
});
editICON.forEach(function (ICON) {
  ICON.addEventListener("click", editComment);
});
replyICON.forEach(function (ICON) {
  ICON.addEventListener("click", replyComment);
});