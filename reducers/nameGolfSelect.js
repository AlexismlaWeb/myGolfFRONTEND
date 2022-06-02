export default function (golfName = "", action) {
  if (action.type === "AddGolfName") {
    return action.name;
  } else {
    return golfName;
  }
}
