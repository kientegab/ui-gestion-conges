import { MotifAbsence } from './motifAbsence.model';
import { TypeDemande } from './typeDemande.model';
export interface Demande {
  id?:number;
  numeroDemande?:string;
  lieuJouissanceBF?:string;
  lieuJouissanceEtranger?:string;
  refeLastDecision?:string;
  situationSND?:string;
  dureeAbsence?:number;
  periodeDebut?:Date;
  periodeFin?:Date;
  position?:string;
  typeDemande?:TypeDemande;
  motifAbsence?:MotifAbsence;
  motifRejet?:string;
}

export interface GetAllDemandeResponse {
  demandes: Demande[];
 }
