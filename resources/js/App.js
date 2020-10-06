import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Header, Layout, Footer} from "./components/InterfaceComponents";
import Login from "./routes/Login/Login";
import Registration from "./routes/Registration/Registration";
import {ProtectedRoute} from "./components/HelperComponents";
import User from "./routes/Users/User/User";
import NotFound from "./routes/NotFound/NotFound";
import Feed from "./routes/Feed/Feed";
import PostPage from "./routes/PostPage/PostPage";
import EditProfile from "./routes/EditProfile/EditProfile";
import Messages from "./routes/Messages/Messages";
import DialogPage from "./routes/Messages/DialogPage/DialogPage";
import {Notifications} from "./components/HelperComponents";
import ReactNotification from "react-notifications-component";
import {ROUTES} from "./helpers/routes";
import allActions from "./store/actions";
import {useSelector, useDispatch} from 'react-redux';
import {profileSelector} from "./store/selectors";
import PasswordRecovery from "./routes/PasswordRecovery/PasswordRecovery";
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const {data, loading} = useSelector(profileSelector);
  const userLoggedIn = useSelector(state => state.auth.loggedIn);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('_token');
    if (isAuthenticated) {
      dispatch(allActions.authActions.logIn());
    } else {
      dispatch(allActions.authActions.setLoggedIn(false));
    }
  }, []);

  return (
    <>
      <ReactNotification />
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
            component={(props) => <PasswordRecovery {...props} />}
            exact
            path={ROUTES.RECOVERY}
          />
          <Route
            component={(props) => <Registration {...props} />}
            exact
            path={ROUTES.REGISTRATION}
          />
          <ProtectedRoute
            Component={User}
            exact
            path={`${ROUTES.USERS}/:id`}
          />
          <ProtectedRoute
            Component={Feed}
            exact
            path={ROUTES.FEED}
          />
          <ProtectedRoute
            Component={PostPage}
            exact
            path={`${ROUTES.POSTS}/:id`}
          />
          <ProtectedRoute
            Component={EditProfile}
            currentUser={data}
            exact
            path={ROUTES.EDIT}
          />
          <ProtectedRoute
            Component={Messages}
            exact
            path={ROUTES.MESSAGES}
          />
          <ProtectedRoute
            Component={DialogPage}
            currentUserId={data.id}
            exact
            path={`${ROUTES.MESSAGES}/:id`}
          />
          <Route component={NotFound}/>
        </Switch>
      </Layout>
      <Footer/>
      {data && <Notifications
        token={localStorage.getItem('_token')}
        userId={data.id}
      />}
    </>
  );
};

export default App;
