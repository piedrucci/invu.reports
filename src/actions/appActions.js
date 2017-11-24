export const CHANGE_MENU_OPTION = 'change_menu_option'

export const SET_SALES_SUMMARY = 'set_sales_summary'
export const SET_SALES_VISIBLE_COLUMNS = 'set_sales_visible_columns'

export const SET_DAY_SUMMARY = 'set_day_summary'
export const SET_PAYMENTS_DAY_SUMMARY = 'toggle_fetch_data'
export const SET_DISCOUNTS_DAY_SUMMARY = 'set_discounts_daysummary'

export const SET_HOURS_DATA = 'set_hours_data'
export const SET_HOURS_VISIBLE_COLUMNS = 'set_hours_visible_columns'

export const TOGGLE_FETCH_DATA = 'toggle_fetch_data'


export const changeMenuOption = (payload) => {
    return {
        type: CHANGE_MENU_OPTION,
        payload
    }
}

export const setSalesSummary = (payload) => {
    return {
        type: SET_SALES_SUMMARY,
        payload
    }
}

export const setDaySummary = (payload) => {
   return {
      type: SET_DAY_SUMMARY,
      payload
   }
}

export const setPaymentsDaySummary = (payload) => {
   return {
      type: SET_PAYMENTS_DAY_SUMMARY,
      payload
   }
}

export const setDiscountsDaySummary = (payload) => {
   return {
      type: SET_DISCOUNTS_DAY_SUMMARY,
      payload
   }
}

export const setHoursData = (payload) => {
   return {
      type: SET_HOURS_DATA,
      payload
   }
}

export const setHoursVisibleCols = (payload) => {
   return {
      type: SET_HOURS_VISIBLE_COLUMNS,
      payload
   }
}

export const setSalesVisibleCols = (payload) => {
   return {
      type: SET_SALES_VISIBLE_COLUMNS,
      payload
   }
}


// export const createBook = (book) => {
//     // Return action
//     return {
//       // Unique identifier
//       type: 'CREATE_BOOK',
//       // Payload
//       book: book
//     }
//   };
