import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-svg-core';
import Skeleton from "react-loading-skeleton";
import {Link} from "react-router-dom";
import {prettyDate} from "../../../helpers/dateConverter";
import './postInfo.scss';
import {TextWithMentions} from "../../../components/HelperComponents";
import {IconWithCount} from "../../../components/UI";
import {ROUTES} from "../../../helpers/routes";
import {handleImageError} from "../../../helpers/anotherMethods";

const PostInfo = ({post = {}, loading, deleteReactionFunc, setReactionFunc}) => {
  const {text, created_at, likes_count, dislikes_count, liked, mentioned_users = [], user = {}} = post;
  const {name, login, avatar, id} = user;

  const handleReactionClick = (reactionType) => {
    if (reactionType) {
      liked ? deleteReactionFunc() : setReactionFunc(true);
    } else {
      (liked === false) ? deleteReactionFunc() : setReactionFunc(false);
    }
  }

  return (
    <div className="post-info">
      <div className="col-lg-12 post-user-info">
        <div className="row">
          <div className="col-lg-1 img-div">
            {!loading
              ?
              <Link to={ROUTES.USERS + `/${id}`}>
                <img className="img-fluid" onError={handleImageError} src={avatar} alt={name}/>
              </Link>
              : <Skeleton height={50} width={50} circle={true}/>
            }
          </div>
          <div className="col-lg-10 name-login-div">
            {!loading
              ? <>
                <p><Link to={ROUTES.USERS + `/${id}`}>{name}</Link></p>
                <span>@{login}</span>
              </>
              : <div className="col-lg-3">
                <Skeleton count={2}/>
              </div>
            }
          </div>
        </div>
      </div>
      <div className="col-lg-12 post-text">
        {!loading && text ? <TextWithMentions text={text} mentions={mentioned_users}/> : <Skeleton count={3}/>}
      </div>
      <div className="col-lg-12 post-date-buttons">
        <div className="row">
          <div className="col-lg-6 date-div">
            {!loading ? prettyDate(created_at, true) : <Skeleton className="w-50"/>}
          </div>
          <div className="col-lg-6 buttons-div d-flex justify-content-end">
            <div className="col-lg-4">
              <IconWithCount
                icon={faThumbsUp}
                count={likes_count}
                onclickFunc={() => handleReactionClick(true)}
                styles={"up-span " + (liked === true ? "liked" : "")}
              />
            </div>
            <div className="col-lg-4">
              <IconWithCount
                icon={faThumbsDown}
                count={dislikes_count}
                onclickFunc={() => handleReactionClick(false)}
                styles={"down-span " + (liked === false ? "disliked" : "")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostInfo;
