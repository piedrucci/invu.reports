import * as appActions from '../actions/appActions'

const initialState = {
    activeModule: 1,

    salesSummaryData: [],
    salesVisibleColumns: [],

    daySummaryData: [],
    paymentsDaySummary: [],
    discountsDaySummary: [],

    hoursSummary: [],
    hoursVisibleColumns: []

 }


 export const appReducer = ( state = initialState, action ) => {
    switch (action.type) {
      case appActions.CHANGE_MENU_OPTION:
          // return Object.assign( {}, action.t )
         return {...state, activeModule: action.payload}



      case appActions.SET_SALES_SUMMARY:
         return {...state, salesSummaryData: action.payload}

      case appActions.SET_SALES_VISIBLE_COLUMNS:
         return {...state, salesVisibleColumns: action.payload}




      case appActions.SET_DAY_SUMMARY:
         return {...state, daySummaryData: action.payload}

      case appActions.SET_PAYMENTS_DAY_SUMMARY:
         return {...state, paymentsDaySummary: action.payload}

      case appActions.SET_DISCOUNTS_DAY_SUMMARY:
         return {...state, discountsDaySummary: action.payload}




      case appActions.SET_HOURS_DATA:
         return {...state, hoursSummary: action.payload}


      case appActions.SET_HOURS_VISIBLE_COLUMNS:
         return {...state, hoursVisibleColumns: action.payload}



       default:
          return state;
    }
 }
