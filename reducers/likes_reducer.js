import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/lib/constants';
import {
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case REHYDRATE: {
            return action.payload && action.payload.likedJobs ? 
                action.payload.likedJobs : state;
        }
        case CLEAR_LIKED_JOBS: 
            return [];
        case LIKE_JOB:
            return _.uniqBy([
                action.payload, ...state
            ], 'jobID');
        default:
            return state;
    }
}
