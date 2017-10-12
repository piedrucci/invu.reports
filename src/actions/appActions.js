
export const CHANGE_MENU_OPTION = 'change_menu_option';


export const changeMenuOption = (payload) => {
    return {
        type: CHANGE_MENU_OPTION,
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