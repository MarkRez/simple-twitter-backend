import React from 'react';
import Skeleton from "react-loading-skeleton";
import {Link} from "react-router-dom";
import {ROUTES} from "../../../helpers/routes";
import {handleImageError} from "../../../helpers/anotherMethods";
import './dialogsList.scss';

const DialogsList = ({ dialogs }) => (
  <div className="dialogs-list w-100 p-0">
    {dialogs.map(dialog =>
      <Link key={dialog.id} to={`${ROUTES.MESSAGES}/${dialog.id}`}>
        <div className='dialog w-100 py-3 px-4'>
          <div className="row">
            <div className="col-lg-1">
              {dialog.avatar
                ? <img src={dialog.avatar} onError={handleImageError} alt="name" className="img-fluid rounded-circle"/>
                : <Skeleton height={50} width={50} circle={true}/>
              }
            </div>
            <div className="col-lg-11">
              <p className="mb-2">
                {dialog.name || <Skeleton width={100} height={20}/>}
              </p>
              <p className="overflow-hidden">
                {dialog.last_message || <Skeleton/>}
              </p>
            </div>
          </div>
        </div>
      </Link>
    )}
  </div>
)

export default DialogsList;
