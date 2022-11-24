export interface Visa {
  id?:number;
  code?:string;
  libelle?:string;
}

export interface GetAllVisaResponse {
   visas: Visa[];
 }
