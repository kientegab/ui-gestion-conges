export interface MotifAbsence {
  id?:number;
  libelle?:string;
  
}

export interface GetAllMotifAbsenceResponse {
   motifAbsences: MotifAbsence[];
 }
