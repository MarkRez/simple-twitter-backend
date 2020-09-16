import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-svg-core';
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { prettyDate } from "../../../helpers/dateConverter";
import './postInfo.scss';
import TextWithMentions from "../../../components/TextWithMentions";


const PostInfo = ({ post = {}, loading }) => {
  const { text, created_at, likes_count, dislikes_count, liked, mentioned_users=[], user = {} } = post;
  const { name, login, avatar, id } = user;

  const handleLikeClick = (e) => {
    e.preventDefault();
    // likeFunc();
  }

  const handleDislikeClick = (e) => {
    e.preventDefault();
    // dislikeFunc();
  }

  const handleImageError = (e) => {
    e.target.src = '/storage/avatars/default.jpg';
  }

  return (
    <div className="post-info">
      <div className="col-lg-12 post-user-info">
        <div className="row">
          <div className="col-lg-1 img-div">
            {!loading
              ?
              <Link to={`/users/${id}`}>
                <img className="img-fluid" src={avatar} alt={name}/>
              </Link>
              : <Skeleton height={50} width={50} circle={true}/>
            }
          </div>
          <div className="col-lg-10 name-login-div">
            {!loading
              ? <>
                <p><Link to={`/users/${id}`}>{name}</Link></p>
                <span>@{login}</span>
              </>
              : <div className="col-lg-3">
                <Skeleton count={2} />
              </div>
            }
          </div>
        </div>
      </div>
      <div className="col-lg-12 post-text">
        {!loading && text ? <TextWithMentions text={text} mentions={mentioned_users} /> : <Skeleton count={3} />}
      </div>
      <div className="col-lg-12 post-date-buttons">
        <div className="row">
          <div className="col-lg-6 date-div">
            {!loading ? prettyDate(created_at, true) : <Skeleton className="w-50"/>}
          </div>
          <div className="col-lg-6 buttons-div d-flex justify-content-end">
            <div className="col-lg-4">
              <span className={"up-span " + (liked === true ? "liked" : "")} onClick={handleLikeClick}>
                <FontAwesomeIcon icon={faThumbsUp} /> {likes_count}
              </span>
            </div>
            <div className="col-lg-4">
              <span className={"down-span "  + (liked === false ? "disliked" : "")} onClick={handleDislikeClick}>
                <FontAwesomeIcon icon={faThumbsDown} /> {dislikes_count}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostInfo;
