import React, {useEffect} from 'react';
import './App.scss';
import {Redirect, Route, Switch} from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./routes/Login";
import Registration from "./routes/Registration";
import ProtectedRoute from "./components/ProtectedRoute";
import User from "./routes/Users/User";
import NotFound from "./routes/NotFound";
import Feed from "./routes/Feed";
import PostPage from "./routes/PostPage";
import EditProfile from "./routes/EditProfile";
import Messages from "./routes/Messages";
import {Layout} from "./components/Layout";
import {ROUTES} from "./helpers/routes";
import allActions from "./redux/actions";
import {useSelector, useDispatch} from 'react-redux';
import {profileSelector, profileSelector1} from "./helpers/selectors";

const App = () => {
  const dispatch = useDispatch();
  const {data, loading} = useSelector(profileSelector);
  const userLoggedIn = useSelector(state => state.user.loggedIn);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('_token');
    if (isAuthenticated) {
      dispatch(allActions.userActions.logIn());
    } else {
      dispatch(allActions.userActions.setLoggedIn(false));
    }
  }, []);

  return (
    <>
      <Header
        isAuthenticated={userLoggedIn}
      />
      <Layout
        isAuthenticated={userLoggedIn}
        user={data}
        loading={loading}
      >
        <Switch>
          <Redirect
            exact
            from="/"
            to={ROUTES.FEED}
          />
          <Route
            component={(props) => <Login {...props} />}
            exact
            path={ROUTES.LOGIN}
          />
          <Route
            component={(props) => <Registration {...props} />}
            exact
            path={ROUTES.REGISTRATION}
          />
          <ProtectedRoute
            Component={User}
            exact
            path={ROUTES.USER}
          />
          <ProtectedRoute
            Component={Feed}
            exact
            path={ROUTES.FEED}
          />
          <ProtectedRoute
            Component={PostPage}
            exact
            path={ROUTES.POST}
          />
          <ProtectedRoute
            Component={EditProfile}
            exact
            path={ROUTES.EDIT}
          />
          <ProtectedRoute
            Component={Messages}
            exact
            path={ROUTES.MESSAGES}
          />
          <Route component={NotFound}/>
        </Switch>
      </Layout>
      <Footer/>
    </>
  );
};

export default App;
