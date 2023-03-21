export interface ILogin {
    email: string,
    password: string,
    remember_me: boolean
}

export interface IRegister extends ILogin {
    password_confirmation: string
}