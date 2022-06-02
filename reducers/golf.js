export default function (golfList = [], action) {
  if (action.type === "AddGolf") {
    var golfListCopy = [...golfList];
    golfListCopy.push(action.golf);
    return golfListCopy;
  } else {
    return golfList;
  }
}
