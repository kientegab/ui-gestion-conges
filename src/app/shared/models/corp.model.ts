export interface Corps {
    id?:number;
    codeCorps?:string;
    libelleCorps?:string;
}


 export interface GetAllCorpsResponse {
  // totalCount: number;
   corps: Corps[];
}