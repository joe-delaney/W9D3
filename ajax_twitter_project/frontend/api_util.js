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