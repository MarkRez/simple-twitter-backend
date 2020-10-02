import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../store/actions';
import { ROUTES } from "../../helpers/routes";
import Skeleton from "react-loading-skeleton";
import {profileReset} from "../../store/selectors";
import './styles/header.scss';

export const Header = ({ isAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    dispatch(profileReset);
    dispatch(allActions.userActions.logOut())
      .then(res => history.push(ROUTES.LOGIN));
  }

  return (
    <header className="fixed-top py-3 px-5">
      <div className="container-fluid">
        <div className="row">
          <span className="logo">Simple Twitter</span>
          <div className="nav-div ml-auto">
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
