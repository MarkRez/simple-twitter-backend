import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../store/actions';
import './header.scss';
import { ROUTES } from "../../helpers/routes";
import Skeleton from "react-loading-skeleton";
import {profileReset} from "../../store/selectors";

const Header = ({ isAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    dispatch(profileReset);
    dispatch(allActions.userActions.logOut())
      .then(res => history.push(ROUTES.LOGIN));
  }

  return (
    <header className="fixed-top">
      <div className="container-fluid">
        <div className="row">
          <b>Simple Twitter</b>
          <div className="nav-div">
            {
              isAuthenticated !== null
                ? (!isAuthenticated
                  ?
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/registration">Registration</Link>
                  </>
                  :
                  <a href="#" onClick={() => handleClick()}>Logout</a>
                )
                : <Skeleton height={30} width={125}/>
            }
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
