export interface IChangePassword {
    currentPassword?: string;
    newPassword?: string;
}
export class ChangePassword implements IChangePassword {
    constructor(
      public currentPassword?: string,
      public newPassword?: string,
    ) {}
 }