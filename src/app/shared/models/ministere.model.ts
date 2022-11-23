export interface Ministere {
  id?:number;
  code?:string;
  libelle?:string;
  sigle?:string;
  description?:string;
}

export interface GetAllMinistereResponse {
   ministeres: Ministere[];
 }
