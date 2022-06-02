export default function (cityGolf = "", action) {
    if (action.type === "transferCity") {
      return action.cityGolf;
    } else {
      return cityGolf;
    }
  }
