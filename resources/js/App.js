import React, {useEffect, useRef} from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';
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
import PasswordRecovery from "./routes/PasswordRecovery/PasswordRecovery";
import PasswordReset from "./routes/PasswordReset/PasswordReset";
import ReactNotification, {store} from "react-notifications-component";
import {ROUTES} from "./helpers/routes";
import allActions from "./store/actions";
import {useSelector, useDispatch} from 'react-redux';
import {profileSelector} from "./store/selectors";
import './App.scss';
import socketService from "./helpers/socketService";

const App = () => {
  const dispatch = useDispatch();
  const {data, loading} = useSelector(profileSelector);
  const userLoggedIn = useSelector(state => state.auth.loggedIn);
  const currentPath = useRef('');
  const location = useLocation();
  currentPath.current = location.pathname;

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('_token');
    if (isAuthenticated) {
      dispatch(allActions.authActions.logIn());
    } else {
      dispatch(allActions.authActions.setLoggedIn(false));
    }
  }, []);

  useEffect(() => {
    if (data) {
      const echo = socketService(`App.User.${data.id}`, [
        {
          listen: '.user.mentioned',
          callback: (data) => {
            store.addNotification({
              title: `You was mentioned in ${data.source.toLowerCase()}!`,
              message: data.text,
              type: "default",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
              }
            });
          }
        },
        {
          listen: '.message.received',
          callback: (data) => {
            if (currentPath.current !== ROUTES.MESSAGES) {
              store.addNotification({
                title: `You received a new message!`,
                message: data.message.text,
                type: "default",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                }
              });
            } else {
              dispatch(allActions.messagesActions.addReceivedMessage(data.message))
            }
          }
        }
      ]);

      return (() => {
        echo.disconnect();
      })
    }
  }, [data]);

  return (
    <>
      <ReactNotification/>
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
            component={(props) => <PasswordReset {...props} />}
            exact
            path={ROUTES.RESET}
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
    </>
  );
};

export default App;
