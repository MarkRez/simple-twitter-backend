import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/axios';
import { User } from "../redux/reducers/userReducer";
import { Posts } from "../redux/reducers/postsReducer";
import { Users } from "../redux/reducers/usersReducer";
import { Feed } from "../redux/reducers/feedReducer";

export const configureStore = () => {
    const { requestsMiddleware } = handleRequests({
        driver: createDriver(
            axios.create({
                baseURL: 'https://jsonplaceholder.typicode.com',
            }),
        ),
    });

    const reducers = combineReducers({
        user: User,
        posts: Posts,
        users: Users,
        feed: Feed
    });

    const composeEnhancers =
        (typeof window !== 'undefined' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
        compose;

    const store = createStore(
        reducers,
        composeEnhancers(applyMiddleware(...requestsMiddleware, thunk)),
    );

    return store;
};