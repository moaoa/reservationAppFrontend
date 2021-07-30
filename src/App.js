import "./App.css";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { List, ListItemText, ListItemIcon, ListItem } from "@material-ui/core";
import { Hotel, HomeOutlined, AddBox, ListRounded } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/Login/Login";
import HotelsPage from "./Pages/Hotels/HotelsPage";
import HomePage from "./Pages/Home/Home";
import HotelRooms from "./Pages/HotelRooms/HotelRooms";
import Header from "./components/Header/Header";
import { useReducer } from "react";
import rootReducer, { intialState } from "./state/rootReducer";
import axios from "axios";
import MyReservations from "./Pages/MyReservationsPage/MyReservations";
import AddHotelPage from "./Pages/AddHotel/AddHotel";
import AddRoom from "./Pages/AddRoom/AddRoom";

export const Context = React.createContext();

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  listItem: {
    color: "#000",
    textDecoration: "none",
  },
});

function App() {
  const [state, dispatch] = useReducer(rootReducer, intialState);
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    axios.get("/sanctum/csrf-cookie").catch(console.log);
  }, []);

  const AdminActions = (
    <>
      <ListItem>
        <ListItemIcon>
          <AddBox />
        </ListItemIcon>
        <Link
          className={classes.listItem}
          to="/add-hotel"
          onClick={() => setIsOpen((state) => !state)}
        >
          <ListItemText primary={"add hotel"}></ListItemText>
        </Link>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AddBox />
        </ListItemIcon>
        <Link
          className={classes.listItem}
          to="/add-room"
          onClick={() => setIsOpen((state) => !state)}
        >
          <ListItemText primary={"add Room"}></ListItemText>
        </Link>
      </ListItem>
    </>
  );

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Router>
        <div className="App">
          <ToastContainer />
          <Header open={setIsOpen} />
          <Drawer
            className="myDrawer"
            open={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <div className={classes.list}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <HomeOutlined />
                  </ListItemIcon>
                  <Link
                    className={classes.listItem}
                    to="/"
                    onClick={() => setIsOpen((state) => !state)}
                  >
                    <ListItemText primary={"Home"}></ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Hotel />
                  </ListItemIcon>
                  <Link
                    className={classes.listItem}
                    to="/hotels"
                    onClick={() => setIsOpen((state) => !state)}
                  >
                    <ListItemText primary={"Hotels"}></ListItemText>
                  </Link>
                </ListItem>
                {state.auth.user?.admin ? AdminActions : null}
                <ListItem>
                  <ListItemIcon>
                    <ListRounded />
                  </ListItemIcon>
                  <Link
                    className={classes.listItem}
                    to="/myreservations"
                    onClick={() => setIsOpen((state) => !state)}
                  >
                    <ListItemText primary={"my Rservations"}></ListItemText>
                  </Link>
                </ListItem>
              </List>
            </div>
          </Drawer>
        </div>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/hotelRooms/:hotelId">
            <HotelRooms />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/hotels">
            <HotelsPage />
          </Route>
          <Route path="/myreservations">
            <MyReservations />
          </Route>
          {state.auth.user?.admin && (
            <Route path="/add-hotel">
              <AddHotelPage />
            </Route>
          )}
          {state.auth.user?.admin && (
            <Route path="/add-room">
              <AddRoom />
            </Route>
          )}
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
