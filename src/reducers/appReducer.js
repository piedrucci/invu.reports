import * as appActions from '../actions/appActions';
 
 const initialState = {
    activeModule: 1,
    // vin: '',
    // license: '',
    // session: {}
 }
 
 export const appReducer = ( state = initialState, action ) => {
    switch (action.type) {
       case appActions.CHANGE_MENU_OPTION:
          // return Object.assign( {}, action.t )
          return {...state, activeModule: action.payload}
 
    //    case SET_SESSION:
    //       // console.log(action.s)
    //       // return Object.assign( {}, action.s )
    //       return {...state, session: action.payload}
 
    //    case SET_VINCODE:
    //       // return Object.assign( {}, action.payload )
    //       return {...state, vin: action.payload }
 
    //    case SET_LICENSECODE:
    //       return Object.assign( {}, action.payload )
 
    //    case GET_VINCODE:
    //       return state;
 
    //    case GET_LICENSECODE:
    //       return state;
 
 
       default:
          return state;
    }
 }