import React from "react";
import Button from "../../../../components/Button";
import Skeleton from "react-loading-skeleton";
import {Link} from "react-router-dom";
import {ROUTES} from "../../../../helpers/routes";
import './userInfo.scss';

const UserInfo = ({userData, followFunc, unFollowFunc, blockFunc, unBlockFunc, theSameUser, loading}) => {
  const {name, avatar, followers_count, followings_count, followed, blocked, login} = userData;

  const handleImageError = (e) => {
    e.target.src = '/storage/avatars/default.jpg';
  }

  const handleClickFollow = () => {
    followed ? unFollowFunc() : followFunc();
  }

  const handleClickBlock = () => {
    blocked ? unBlockFunc() : blockFunc();
  }

  return (
    <div className="user-info w-100">
      <div className="user-info-inner">
        <div className="row">
          <div className="col-lg-12 img-div-wrapper">
            <div className="img-div">
              {!loading
                ? <img src={avatar} onError={handleImageError} alt="name" className="img-thumbnail img-circle"/>
                : <Skeleton height={150} width={150} circle={true}/>
              }
            </div>
          </div>
          {!loading
            ? <>
              <div className="col-lg-7 user-info-div">
                <p className="p-name">{name}</p>
                <p>@{login}</p>
                <p><span>{followings_count}</span> Following <span className="ml-3">{followers_count}</span> Followers
                </p>
              </div>
              <div className="col-lg-5 buttons-div text-right">
                {theSameUser !== undefined
                  ? theSameUser
                    ? <Link to={ROUTES.EDIT}><Button style="twitter">Edit profile</Button></Link>
                    : <>
                      <Button onClickFunc={handleClickFollow}
                              style="twitter">{followed ? "Unfollow" : "Follow"}</Button>
                      <br/>
                      <Button onClickFunc={handleClickBlock}
                              style="twitter">{blocked ? "Unblock" : "Block"}</Button>
                    </>
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
