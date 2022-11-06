export const initialState: any = null;

export const reducer = (state: any, action: any) => {
  if (action.type === 'USER') {
    return action.payload;
  }

  return state;
}

// initialState = {
//   loggedIn: localStorage.getItem('isLoggedin') || false,
// }
