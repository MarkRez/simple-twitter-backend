import React from "react";
import {Button} from "../../../../components/UI";
import Skeleton from "react-loading-skeleton";
import {Link} from "react-router-dom";
import {ROUTES} from "../../../../helpers/routes";
import {handleImageError} from "../../../../helpers/anotherMethods";
import './userInfo.scss';

const UserInfo = ({userData, follow, unFollow, block, unBlock, theSameUser, loading, onSendMessageClick}) => {
  const {id, name, avatar, followers_count, followings_count, followed, blocked, login} = userData;

  const handleClickFollow = () => {
    followed ? unFollow() : follow();
  }

  const handleClickBlock = () => {
    blocked ? unBlock() : block();
  }

  return (
    <div className="user-info w-100 p-0 mb-5">
      <div className="user-info-inner">
        <div className="row">
          <div className="col-lg-12 img-div-wrapper">
            <div className="position-absolute img-div mx-auto">
              {!loading
                ? <img
                  src={avatar}
                  onError={handleImageError}
                  alt="name"
                  className="img-thumbnail img-circle rounded-circle h-100 w-100"
                />
                : <Skeleton height={150} width={150} circle={true}/>
              }
            </div>
          </div>
          {!loading
            ? <>
              <div className="col-lg-7 user-info-div">
                <p className="p-name mb-n2">{name}</p>
                <p>@{login}</p>
                <p>
                  <span>{followings_count}</span> Following
                  <span className="ml-3">{followers_count}</span> Followers
                </p>
              </div>
              <div className="col-lg-5 buttons-div text-right">
                {theSameUser !== undefined
                  ? theSameUser
                    ? <Link to={ROUTES.EDIT}><Button style="twitter">Edit profile</Button></Link>
                    : <>
                      <Button handleClick={handleClickFollow}
                              style="twitter">{followed ? "Unfollow" : "Follow"}</Button>
                      <Button handleClick={handleClickBlock}
                              style="twitter">{blocked ? "Unblock" : "Block"}</Button>
                      <br/>
                      <Button handleClick={onSendMessageClick} style="add">Send message</Button>
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
