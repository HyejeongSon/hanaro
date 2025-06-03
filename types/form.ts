export type TSignUpFormError = {
  name?: string[];
  email?: string[];
  password?: string[];
  phone?: string[];
  birth?: string[];
  gender?: string[];
};

export type TLoginFormError = {
  email?: string[];
  password?: string[];
};
