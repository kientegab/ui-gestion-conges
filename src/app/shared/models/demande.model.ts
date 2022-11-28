import { MotifAbsence } from './motifAbsence.model';
import { TypeDemande } from './typeDemande.model';

export interface Utilisateur {
  matricule?:string;
  nom?:string;
  prenom?:string;
  emploi?:string;
}
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
  avis?:string;
  etat?:string;
  utilisateur?:Utilisateur
  typeDemande?:TypeDemande;
  motifAbsence?:MotifAbsence;
  motifRejet?:string;

}

export interface GetAllDemandeResponse {
  demandes: Demande[];
 }

 export interface GetUtilisateurResponse {
  utilisateur: Utilisateur;
 }
