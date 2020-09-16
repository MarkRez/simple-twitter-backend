import {getQuerySelector, resetRequests} from "@redux-requests/core";

import {
  FETCH_PROFILE,
  FETCH_CURRENT_POST,
  FETCH_CURRENT_POST_COMMENTS,
  FETCH_USER,
  FETCH_USER_POSTS,
  FETCH_FEED,
  FETCH_TAGS
} from "../redux/constants";

const skeletonArr = [{id: "skltn 1"}, {id: "skltn 2"}, {id: "skltn 3"}, {id: "skltn 4"}, {id: "skltn 5"}];

// profile selectors
export const profileSelector = getQuerySelector({ type: FETCH_PROFILE, defaultData: false });

// post selectors
export const currentPostSelector = getQuerySelector({ type: FETCH_CURRENT_POST, defaultData: false});
export const currentPostCommentsSelector = getQuerySelector({
  type: FETCH_CURRENT_POST_COMMENTS,
  defaultData: {data: skeletonArr.slice(0, 3)} });
export const currentPostReset = resetRequests([FETCH_CURRENT_POST]);
export const currentPostCommentsReset = resetRequests([FETCH_CURRENT_POST_COMMENTS]);

// user selectors
export const userSelector = getQuerySelector({ type: FETCH_USER, defaultData: false});
export const userPostsSelector = getQuerySelector({
  type: FETCH_USER_POSTS,
  defaultData:{data: skeletonArr.slice(0,3)} });
export const currentUserReset = resetRequests([FETCH_USER]);
export const currentUserPostsReset = resetRequests([FETCH_USER_POSTS]);

// feed selectors
export const feedSelector = getQuerySelector({
  type: FETCH_FEED,
  defaultData:{data: skeletonArr.slice(0,4) }});
export const feedReset = resetRequests([FETCH_FEED]);

// tags selectors
export const tagsSelector = getQuerySelector({type: FETCH_TAGS, defaultData: []});
