export default function (userInfo = {}, action) {
  if (action.type == "AddActiveUser") {
    return action.user;
  } else {
    return userInfo;
  }
}
