export interface IExemple {
    id?:number;
    libelle?:string;
    description?:string;
}

export class Exemple implements IExemple {
    constructor(
      public id?: number,
      public libelle?: string,
      public description?: string,
    ) {}
 }
 export interface GetAllExempleResponse {
  // totalCount: number;
   exemples: IExemple[];
}