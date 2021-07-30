import { format } from "../utils/formatDate";
import { actionTypes } from "./actions";
const today = format(new Date());
export const intialState = {
  fromDate: today,
  toDate: today,
  error: {
    isError: false,
    errorText: "",
  },
  availableRooms: [],
  hotels: [],
  auth: {
    user: null,
    token: null,
    error: null,
  },
  myReservations: [],
};
const rootReducer = (state = intialState, action) => {
  console.log("state logger");
  console.log({ action });
  switch (action.type) {
    case actionTypes.SET_AVAILABLE_ROOMS:
      return {
        ...state,
        availableRooms: action.data,
      };
    case actionTypes.REMOVE_ROOM:
      return {
        ...state,
        availableRooms: state.availableRooms.filter(
          (room) => room.id !== action.roomId
        ),
      };
    case actionTypes.SET_FROM_DATE:
      return {
        ...state,
        fromDate: action.fromDate,
      };
    case actionTypes.SET_TO_DATE:
      return {
        ...state,
        toDate: action.toDate,
      };
    case actionTypes.SET_HOTELS:
      return {
        ...state,
        hotels: action.data,
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.data,
      };
    case actionTypes.SET_AUTH_ERROR:
      return {
        ...state,
        auth: {
          ...state.auth,
          error: action.error,
        },
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        auth: action.data,
      };
    case actionTypes.SET_USER_RESERVATIONS:
      return {
        ...state,
        myReservations: action.data,
      };
    default:
      return state;
  }
};

export default rootReducer;
