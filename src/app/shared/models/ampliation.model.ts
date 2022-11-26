export interface Ampliation {
  id?:number;
  code?:string;
  libelle?:string;
}

export interface GetAllAmpliationResponse {
   ampliations: Ampliation[];
 }
