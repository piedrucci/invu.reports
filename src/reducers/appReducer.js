// import React , { Component}  from 'react'
import * as appActions from '../actions/appActions'
// import _ from 'lodash'

const initialState = {
    activeModule: 1,
   //  itemsSummaryHeader: [
   //      {Header:'Item', accessor:'item', width: 400},
   //      {Header:'Quantity',accessor:'quantityItems', Footer: dataFooter},
   //      {Header:'Order Count',accessor:'quantityOrders'},
   //      {Header:'Gross', accessor:'gross'},
   //      {Header:'Discount', accessor:'discount'},
   //      {Header:'Net',accessor:'net'},
   //      {Header:'Order Tax',accessor:'orderTax'},
   //      {Header:'Hour',accessor:'hour'}],
    itemsSummaryData: []
 }


 export const appReducer = ( state = initialState, action ) => {
    switch (action.type) {
      case appActions.CHANGE_MENU_OPTION:
          // return Object.assign( {}, action.t )
          return {...state, activeModule: action.payload}

      case appActions.SET_ITEMS_SUMMARY:
          return {...state, itemsSummaryData: action.payload}

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
