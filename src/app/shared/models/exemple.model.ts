export interface IExemple {
    id?:number;
    nom?:string;
    prenom?:string;
}

export class Exemple implements IExemple {
    constructor(
      public id?: number,
      public nom?: string,
      public prenom?: string,
    ) {}
 }