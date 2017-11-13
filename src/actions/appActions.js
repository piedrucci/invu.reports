export const CHANGE_MENU_OPTION = 'change_menu_option'
export const SET_DAY_SUMMARY = 'set_day_summary'
export const SET_SALES_SUMMARY = 'set_sales_summary'
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


// export const createBook = (book) => {
//     // Return action
//     return {
//       // Unique identifier
//       type: 'CREATE_BOOK',
//       // Payload
//       book: book
//     }
//   };
