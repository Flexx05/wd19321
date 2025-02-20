export interface IRegister {
  id: string;
  fullName: string;
  email: string;
  birthday: string;
  gender: string;
  password: string;
  confirmPassword: string | undefined;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  birthday: string;
  gender: string;
  password: string;
}
