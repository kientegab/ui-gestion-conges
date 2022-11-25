export interface Avis {
  id?:number;
  avisDrh?:string;
  avisSg?: string;
  avisSh?: string;
  avisDg?:string;
}

export interface GetAllAvisResponse {
   aviss: Avis[];
 }
