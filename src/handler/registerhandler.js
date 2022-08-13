export const initialSignUpState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordRepeat: "",
};

export function signupReducer(state, action) {
  return { ...state, [action.type]: action.value };
}
