export default function (user = "", action) {
  if (action.type == "addUser") {
    return action.user;
  } else {
    return user;
  }
}
