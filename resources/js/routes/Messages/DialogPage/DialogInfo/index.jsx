import React from 'react';
import {Link} from "react-router-dom";
import './dialogInfo.scss';
import {handleImageError} from "../../../../helpers/anotherMethods";
import Skeleton from "react-loading-skeleton";
import {ROUTES} from "../../../../helpers/routes";

const DialogInfo = ({user}) => (
  <div className="dialog-info row">
    <div className="img-div">
      <Link to={ROUTES.USERS + `/${user.id}`}>
        {user.avatar
          ? <img src={user.avatar} onError={handleImageError} alt="name" className="img-fluid"/>
          : <Skeleton height={50} width={50} circle={true}/>
        }
      </Link>
    </div>
    <div className="name-div">
      <h3>{user.name || <Skeleton width={125} height={25}/>}</h3>
    </div>
  </div>
);

export default DialogInfo;
