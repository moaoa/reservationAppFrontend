import axios from "axios";
import { toast } from "react-toastify";
export const actionTypes = {
  REMOVE_ROOM: "REMOVE_ROOM",
  SET_ERROR: "SET_ERROR",
  SET_AVAILABLE_ROOMS: "SET_AVAILABLE_ROOMS",
  SET_HOTELS: "SET_HOTELS",
  SET_USER: "SET_USER",
  SET_USER_RESERVATIONS: "SET_USER_RESERVATIONS",
  SET_AUTH_ERROR: "SET_AUTH_ERROR",
};

axios.defaults.withCredentials = true;

export const setError = (stateContainer, isError, errorText = "") => {
  stateContainer.dispatch({
    type: actionTypes.SET_ERROR,
    data: { isError, errorText },
  });
};
export const setAuthError = (context, error) => {
  context.dispatch({ type: actionTypes.SET_AUTH_ERROR, error });
};

export const reserveRoom = (stateContainer, roomId) => {
  const action = {
    type: actionTypes.REMOVE_ROOM,
    roomId,
  };
  const reservation = {
    room_id: roomId,
    user_id: stateContainer.state.auth.user.id,
    startDate: stateContainer.state.fromDate,
    endDate: stateContainer.state.toDate,
  };
  axios
    .post("/api/reservations", reservation, {
      headers: {
        Authorization: "Bearer " + stateContainer.state.auth.token,
      },
    })
    .then((res) => {
      if (res.status === 201) {
        toast("this room was reserved for you");
        stateContainer.dispatch(action);
      } else {
        toast.error("problem");
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("problem");
    });
};

export const setAvailableRooms = (stateContainer, rooms) => {
  stateContainer.dispatch({
    type: actionTypes.SET_AVAILABLE_ROOMS,
    data: rooms,
  });
};
export const getAvailableRooms = (stateContainer) => {
  const d1 = new Date(stateContainer.state.fromDate);
  const d2 = new Date(stateContainer.state.toDate);

  // if startDate is after endDate
  if (d1.getTime() > d2.getTime()) {
    setError(
      stateContainer,
      true,
      "reservation End Date can't be before starting date "
    );
    return;
  }
  setError(stateContainer, false);
  axios
    .get(
      `api/reservations/date?from="${stateContainer.state.fromDate}"&to="${stateContainer.state.toDate}"`
    )
    .then((res) => setAvailableRooms(stateContainer, res.data))
    .catch(console.log);
};

export const getUserReservations = (context) => {
  axios
    .get("/api/my-reservations", {
      headers: {
        Authorization: `Bearer ${context.state.auth.token}`,
      },
    })
    .then((res) => {
      context.dispatch({
        type: actionTypes.SET_USER_RESERVATIONS,
        data: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      toast.error("something went wrong");
    });
};

// hotels
export const setHotels = (stateContainer, hotels) => {
  stateContainer.dispatch({ type: actionTypes.SET_HOTELS, data: hotels });
};
export const getHotels = (stateContainer) => {
  axios
    .get("/api/hotels")
    .then((res) => {
      setHotels(stateContainer, res.data);
    })
    .catch(console.log);
};

export const CreateHotel = (context, name) => {
  axios
    .post(
      "/api/hotels",
      { name },
      {
        headers: {
          Authorization: "Bearer " + context.state.auth.token,
        },
      }
    )
    .then((res) => {
      // console.log(res.data);
      getHotels(context);
    });
};

// date setters
// HOC
export const setFromDate = (stateContainer) => (fromDate) => {
  stateContainer.dispatch({ type: actionTypes.SET_FROM_DATE, fromDate });
};
export const setToDate = (stateContainer) => (toDate) => {
  stateContainer.dispatch({ type: actionTypes.SET_TO_DATE, toDate });
};

// AUTH ACTIONS

export const registerUserHOC = (context) => (data) => {
  axios
    .post("/api/register", data)
    .then((result) => {
      context.dispatch({ type: actionTypes.SET_USER, data: result.data });
    })
    .catch((e) => {
      toast.error("something went wrong");
      console.log(e);
    });
};
export const loginUserHOC = (context) => (data) => {
  axios
    .post("/api/login", data)
    .then((res) => {
      context.dispatch({ type: actionTypes.SET_USER, data: res.data });
      console.log("RES: ", res);
    })
    .catch((e) => {
      toast.error("something went wrong");
      let message = e.response.status === 401 ? "wrong credintials" : "";
      message = e.response.status === 500 ? "server error" : message;
      console.log(message);

      context.dispatch({
        type: actionTypes.SET_AUTH_ERROR,
        error: message,
      });
      console.log(e.response.status);
    });
};
