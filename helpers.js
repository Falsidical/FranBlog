export default {
  isLoggedIn: function (user) {
    if (user.username) return true;
    return false;
  },
  formatDateFull: function (date) {
    return date.toLocaleString();
  },
  formatDateShort: function (date) {
    return date.toLocaleDateString();
  },
};
