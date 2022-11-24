export interface MotifAbsence {
  id?:number;
  libelle?:string;
  description?:string;
}

export interface GetAllMotifAbsenceResponse {
   motifAbsences: MotifAbsence[];
 }
