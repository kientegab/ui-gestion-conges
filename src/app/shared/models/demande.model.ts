import { MotifAbsence } from './motifAbsence.model';
import { TypeDemande } from './typeDemande.model';
import { Agent } from './agent.model';

export interface Utilisateur {
  id?:number;
  matricule?:string;
  nom?:string;
  prenom?:string;
  // ministere?:string;
  // service?:string;
  // emploi?:string;
  // superieurHD?:string;

}
export interface Demande {
  id?:number;
  agent?:Agent
  numeroDemande?:string;
  lieuJouissanceBF?:string;
  lieuJouissanceEtrang?:string;
  refLastDecision?:string;
  situationSND?:string;
  dureeAbsence?:number;
  periodeDebut?:Date;
  periodeFin?:Date;
  positionDemande?:string;
  statusDemande?:string;
  trancheDemande?:string;
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
