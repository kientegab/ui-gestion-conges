export interface IPasswordForgot{
    email?:string;
}

export class PasswordForgot implements IPasswordForgot {
    constructor(
      public email?: string,
    ) {}
 }