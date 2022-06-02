export default function (reservGolfOption = {}, action) {
  if (action.type === "AddReservation") {
    return action.reservGolfOption;
  } else {
    return reservGolfOption;
  }
}
