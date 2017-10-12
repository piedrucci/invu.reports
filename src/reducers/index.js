import { combineReducers } from 'redux';

import {appReducer} from './appReducer';

const rootReducer = combineReducers({
    appInfo: appReducer,
})

export default rootReducer