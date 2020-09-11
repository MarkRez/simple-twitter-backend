import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-svg-core';
import { prettyDate } from "../../helpers/dateConverter";
import './listEntity.scss';

const ListEntity = ({ data, type, loading }) => {
  const { id, text, user_id, created_at, likes_count, dislikes_count, comments_count, liked, user = {}} = data;
  const { login, avatar, name } = user;

  const shortText = (text) => {
    if (text.length <= 500) {
      return text;
    } else {
      return `${text.slice(0, 500)} ...`
    }
  };

  const handleLikeClick = (e) => {
    e.preventDefault();
    // likeFunc();
  }

  const handleDislikeClick = (e) => {
    e.preventDefault();
    // dislikeFunc();
  }

  const handleImageError= (e) => {
    e.target.src = '/storage/avatars/default.jpg';
  }

  return (
    <div className="entity w-100">
      <div className="row">
        <div className="post-img col-1">
          {!loading
            ?
            <Link to={`/users/${user_id}`}>
              <img src={avatar} onError={handleImageError} alt="name" className="img-fluid" />
            </Link>
            : <Skeleton height={50} width={50} circle={true}/>
          }
        </div>
        <div className="post-text-buttons col-11">
          <div className="row">
            <div className="col-lg-12 post-author px-3">
              {!loading
                ? <>
                  <Link to={`/users/${user_id}`}>{name}</Link> · @{login} · {prettyDate(created_at)}
                </>
                : <Skeleton />
              }
            </div>
            <div className="col-lg-12 post-text px-3">
              {!loading && text ? shortText(text) : <Skeleton count={type === "post" ? 3 : 2}/>}
            </div>
            { type === "post"
              ?
              <div className="col-lg-12 post-buttons row">
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
                <div className="col-lg-4">
                    <span className="comment-span">
                      <FontAwesomeIcon icon={faCommentDots} /> {comments_count}
                    </span>
                </div>
              </div>
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListEntity;
