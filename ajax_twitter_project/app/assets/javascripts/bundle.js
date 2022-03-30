/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/***/ ((module) => {

const APIUtil = {
  followUser: id => {
    return $.ajax({
      method: "POST",
      url: `/users/${id}/follow`,
      dataType: "JSON"
    });
  },

  unfollowUser: id => {
    return $.ajax({
      method: "DELETE",
      url: `/users/${id}/follow`,
      dataType: "JSON"
    });
  },

  searchUsers: queryVal => {
    return $.ajax({
      method: "GET",
      url: "/users/search",
      data: {
        query: queryVal
      },
      dataType: "JSON"
    });
  }



};

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

class FollowToggle {
  constructor(el, options) {
    this.el = $(el);
    this.userId = this.el.data("userId") || options.id;
    this.followState =  this.el.data("initialFollowState")
    if(this.followState === undefined) this.followState = options.followed;
    this.render();
    this.el.prop("disabled", false);
    this.handleClick = this.handleClick.bind(this);
    this.el.on("click", this.handleClick);
  
  }

  render(){
    if(this.followState === false){
      this.el.text("Follow!");
    }
    else{
      this.el.text("Unfollow!");
    }
    this.el.prop("disabled", false);
  }

  handleClick(event){
    this.el.prop("disabled", true); 
    if(this.followState === false){
      APIUtil.followUser(this.userId)
      .then(() => {
        this.followState = true;
        this.render();
      });
    } else {
      APIUtil.unfollowUser(this.userId)
      .then(() => {
        this.followState = false;
        this.render();
      });
    }
    
  }
}

module.exports = FollowToggle;

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");
class UsersSearch {
  constructor(el) {
    this.el = $(el);
    this.input = this.el.find("input");
    this.ul = this.el.find(".users");
    this.handleInput = this.handleInput.bind(this);
    this.el.on("input", this.handleInput);
  }
  handleInput(e){
    // debugger;
    const value = this.input.val();
    APIUtil.searchUsers(value)
    .then( (results) => {this.renderResults(results);})
    .fail(() =>{console.log("FAILLL");});
    
  }

  renderResults(results) {
    this.ul.empty();
    for(let i = 0; i < results.length; i++) {
      const $li = $(`<li>
                    <a href="/users/${results[i].id}">${results[i].username}</a>
                    </li>`);
      const $button = $(`<button class="follow-toggle"></button>`);
      new FollowToggle($button, results[i]);
      $li.append($button);
      this.ul.append($li);
    }
  }
}

module.exports = UsersSearch;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search */ "./frontend/users_search.js");

$(() => {
  const buttons = $('button.follow-toggle');
  buttons.each((index, ele) => {
    new FollowToggle(ele);
  });

  const usersSearch =$('nav.users-search');
  usersSearch.each((index, ele) => {
    new UsersSearch(ele);
  });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map