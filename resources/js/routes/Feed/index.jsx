import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from "../../redux/actions";
import { feedSelector, feedReset } from "../../helpers/selectors";
import HandleScroll from "../../components/HandleScroll";
import EntityList from "../../components/EntityList";

const Feed = () => {
  const dispatch = useDispatch();
  const [scrollPage, setScrollPage] = useState(1);
  const feed = useSelector(feedSelector);
  const totalPages = feed.data.last_page;
  const feedIsLoading = feed.loading;

  useEffect(()=> {
    dispatch(allActions.feedActions.getFeed(scrollPage));
    return () => {
      dispatch(feedReset);
    }
  }, [])

  const nextPage = () => {
    if (!feedIsLoading && !(scrollPage + 1 > totalPages)) {
      setScrollPage(scrollPage + 1);
      dispatch(allActions.feedActions.getFeed(scrollPage + 1));
    }
  }

  return (
    <div className="feed-page">
      <HandleScroll
        handleFunc={nextPage}
      />
      <EntityList
        entities={feed.data.data}
        type="post"
      />
      {feedIsLoading && "Loading ..."}
    </div>
  )
};

export default Feed;
