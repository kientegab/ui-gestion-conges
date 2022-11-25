export interface Corps {
    id?:number;
    cdCorps?:string;
    lbCorps?:string;
}


 export interface GetAllCorpsResponse {
  // totalCount: number;
   corps: Corps[];
}