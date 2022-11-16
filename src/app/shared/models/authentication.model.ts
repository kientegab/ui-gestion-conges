export interface IAuthentication {
    username?:string;
    password?:string;
    rememberMe?:boolean;
}
export class Authentication implements IAuthentication {
    constructor(
      public username?: string,
      public password?: string,
      public rememberMe?: boolean,
    ) {}
 }