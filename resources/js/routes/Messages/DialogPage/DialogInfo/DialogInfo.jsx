import React from 'react';
import {Link} from "react-router-dom";
import {handleImageError} from "../../../../helpers/anotherMethods";
import Skeleton from "react-loading-skeleton";
import {ROUTES} from "../../../../helpers/routes";
import './dialogInfo.scss';

const DialogInfo = ({user}) => (
  <div className="dialog-info py-2 px-3 mb-3 row">
    <div className="img-div mr-3">
      <Link to={ROUTES.USERS + `/${user.id}`}>
        {user.avatar
          ? <img src={user.avatar} onError={handleImageError} alt="name" className="img-fluid rounded-circle"/>
          : <Skeleton height={50} width={50} circle={true}/>
        }
      </Link>
    </div>
    <div className="name-div align-middle">
      <h3 className="mb-0">{user.name || <Skeleton width={125} height={25}/>}</h3>
    </div>
  </div>
);

export default DialogInfo;
