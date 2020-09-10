import React from "react";
import './userInfo.scss';
import Button from "../../../../components/Button";
import Skeleton from "react-loading-skeleton";
import {Link} from "react-router-dom";
import {ROUTES} from "../../../../helpers/routes";

const UserInfo = ({ userData, followFunc, theSameUser }) => {
  const { name, avatar, followers_count, followings_count, followed, login } = userData;

  const handleImageError = (e) => {
      e.target.src = '/storage/avatars/default.jpg';
  }

  return (
    <div className="user-info w-100">
      <div className="user-info-inner">
        <div className="row">
          <div className="col-lg-12 img-div-wrapper">
            <div className="img-div">
                {avatar
                    ? <img src={avatar} onError={handleImageError} alt="name" className="img-thumbnail img-circle"/>
                    : <Skeleton height={150} width={150} circle={true}/>
                }
            </div>
          </div>
          { name
            ? <>
              <div className="col-lg-7 user-info-div">
                <p className="p-name">{name}</p>
                <p>@{login}</p>
                <p><span>{followings_count}</span> Following <span className="ml-3">{followers_count}</span> Followers</p>
              </div>
              <div className="col-lg-5 buttons-div text-right">
                { theSameUser !== undefined
                  ? (theSameUser
                    ? <Link to={ROUTES.EDIT}><Button style="twitter">Edit profile</Button></Link>
                    :<Button onClickFunc={followFunc} style="twitter">{followed ? "Unfollow" : "Follow"}</Button>)
                  : <Skeleton width={125} height={30}/>
                }
              </div>
            </>
            : <div className="col-lg-4">
              <Skeleton count={3}/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default UserInfo;
