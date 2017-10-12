import { createStore } from 'redux';
// import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const configureStore = (initialState) => {
    try{
        return createStore(
            rootReducer,
            initialState,
            // applyMiddleware(reduxImmutableStateInvariant())
            // applyMiddleware(thunk)
        );
    }catch(err){
        alert ('configureStore: '+err)
    }
}

export default configureStore;