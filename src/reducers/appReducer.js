// import React , { Component}  from 'react'
import * as appActions from '../actions/appActions'

const initialState = {
    activeModule: 1,
    salesSummaryData: [],
    itemsSummaryData: []
 }


 export const appReducer = ( state = initialState, action ) => {
    switch (action.type) {
      case appActions.CHANGE_MENU_OPTION:
          // return Object.assign( {}, action.t )
         return {...state, activeModule: action.payload}

      case appActions.SET_SALES_SUMMARY:
         return {...state, salesSummaryData: action.payload}

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
