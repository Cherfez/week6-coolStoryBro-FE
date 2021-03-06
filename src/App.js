import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import { Jumbotron } from "react-bootstrap";
import Homepage from "./pages/Homepage/index";
import HomepageDetails from "./pages/HomepageDetails/index";
import MyPage from "./pages/MyPage/index";

const Home = () => (
  <div>
    <Jumbotron>
      <h1>Homepages</h1>
    </Jumbotron>
    <Homepage />
  </div>
);
const Other = () => (
  <div>
    <Jumbotron>
      <h1>My Page</h1>
    </Jumbotron>
    <MyPage />
  </div>
);

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/other" component={Other} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/:id" component={HomepageDetails} />
      </Switch>
    </div>
  );
}

export default App;
