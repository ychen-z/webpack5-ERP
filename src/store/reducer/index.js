import { combineReducers } from 'redux';
import * as type from '@/store/action/type';
// import Immutable from 'immutable';
// const initialState = Immutable.fromJS({ count: 0 });

const handleData = (state = { isFetching: true, data: {} }, action) => {
    switch (action.type) {
        case type.REQUEST_DATA:
            return {
                ...state,
                isFetching: true
            };
        case type.RECEIVE_DATA:
            return {
                ...state,
                isFetching: false,
                ...action.data
            };
        default:
            return {
                ...state
            };
    }
};

const httpData = (state = {}, action) => {
    switch (action.type) {
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
            return {
                ...state,
                [action.category]: handleData(state[action.category], action)
            };
        default:
            return {
                ...state
            };
    }
};

export default combineReducers({ httpData });
