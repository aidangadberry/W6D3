/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => $.ajax({
    type: "POST",
    url: `/users/${id}/follow`,
    dataType: "json"
  }),

  unfollowUser: id => $.ajax({
    type: "DELETE",
    url: `/users/${id}/follow`,
    dataType: "json"
  }),
  
  searchUsers: queryVal => $.ajax({
    type: "GET",
    url: "/users/search",
    dataType: "json",
    data: { query: queryVal }
  }),
  
  createTweet: data => $.ajax({
    type: "POST",
    url: "/tweets",
    dataType: "json",
    data
  })
};

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

class FollowToggle {
  constructor(el, options) {
    console.log(options);
    this.$el = $(el);
    this.userId = this.$el.data("user-id") || options.userId;
    this.followState = this.$el.data("init-follow-state") || options.followState;
    
    this.render();
    this.$el.on("click", (e) => this.handleClick(e));
  }
  
  render() {
    if (this.followState === "unfollowed") {
      this.$el.text("Follow!");
      this.$el.prop("disabled", false);
    } else if (this.followState === "followed"){
      this.$el.text("Unfollow!");
      this.$el.prop("disabled", false);
    } else if (this.followState === "following"){
      this.$el.text("Following...");
      this.$el.prop("disabled", true);
    } else if (this.followState === "unfollowing"){
      this.$el.text("Unfollowing...");
      this.$el.prop("disabled", true);
    }
  }
  
  toggleFollow() {
    this.followState = (this.followState === "following") ? "followed" : "unfollowed";
    this.render();
  }
  
  handleClick(e) {
    e.preventDefault();
    if(this.followState === "unfollowed") {
      this.followState = "following";
      this.render();
      APIUtil.followUser(this.userId).then(this.toggleFollow.bind(this));
    } else {
      this.followState = "unfollowing";
      this.render();
      APIUtil.unfollowUser(this.userId).then(this.toggleFollow.bind(this));
    }
  }
}



module.exports = FollowToggle;

/***/ }),

/***/ "./frontend/tweet_compose.js":
/*!***********************************!*\
  !*** ./frontend/tweet_compose.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

class TweetCompose {
  constructor(el) {
    this.$el = $(el);
    this.$el.on("submit", (e) => this.submit(e));
  }
  
  submit(e) {
    e.preventDefault();
    console.log(e.currentTarget[1].value);
    const json = this.$el.serializeJSON();
    $(".tweet").prop("disabled", true);
    APIUtil.createTweet(json);
  }
}

module.exports = TweetCompose;

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search */ "./frontend/users_search.js");
const TweetCompose = __webpack_require__(/*! ./tweet_compose */ "./frontend/tweet_compose.js");

$( () => {
  $("button.follow-toggle").each((i, el) => new FollowToggle(el));
  $("nav.users-search").each((i, el) => new UsersSearch(el));
  $(".tweet-compose").each((i, el) => new TweetCompose(el));
});

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = this.$el.find("input");
    this.$ul = this.$el.find('.users');
    
    this.$el.on("input", (e) => this.handleInput(e));
  }
  
  handleInput(e) {
    if (this.$input.val() === '') {
      this.renderResults([]);
      return;
    }
    
    APIUtil.searchUsers(this.$input.val())
      .then(users => this.renderResults(users));
  }
  
  renderResults(users) {
    this.$ul.empty();
    
    users.forEach(user => {
      const li = $("<li>");
      const a = $("<a>");
      a.prop("href", `/users/${user.id}`);
      a.text(`${user.username}`);
      li.append(a);
      const followState = user.followed ? "followed" : "unfollowed";
      const button = $("<button>");
      new FollowToggle(button, {userId: user.id, followState: followState});
      li.append(button);
      this.$ul.append(li);
    });
  }
}

module.exports = UsersSearch;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map