export interface ILogin {
    email: string,
    password: string,
}

export interface IRegister extends ILogin {
    password_confirmation: string
}