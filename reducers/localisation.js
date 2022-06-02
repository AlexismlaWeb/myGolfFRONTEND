export default function (localisation = '', action) {
    if (action.type === "AddLocalisation") {
      return action.localisation;
    } else {
      return localisation;
    }
  }
  