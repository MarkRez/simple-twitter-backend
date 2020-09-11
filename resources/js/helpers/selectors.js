import {getQuerySelector} from "@redux-requests/core";

import {
  FETCH_PROFILE
} from "../redux/constants";

export const profileSelector = getQuerySelector({ type: FETCH_PROFILE });
