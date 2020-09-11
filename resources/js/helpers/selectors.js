import { getQuerySelector } from "@redux-requests/core";

import {
  FETCH_PROFILE,
  FETCH_CURRENT_POST,
  FETCH_CURRENT_POST_COMMENTS
} from "../redux/constants";

export const profileSelector = getQuerySelector({ type: FETCH_PROFILE, defaultData: false });
export const currentPostSelector = getQuerySelector({ type: FETCH_CURRENT_POST, defaultData: false});
export const currentPostCommentsSelector = getQuerySelector({
  type: FETCH_CURRENT_POST_COMMENTS,
  defaultData: [{id: "skeleton 1"}, {id: "skeleton 2"}, {id: "skeleton 3"}] });
