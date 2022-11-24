import { Corps } from "./corp.model";

export interface Agent {
  id?:number;
  matricule?:string;
  cleMatricule?:string;
  nom?:string;
  prenom?:string;
  nomJeuneFille?:string;
  sexe?:string;
  dateNaissance?:Date;
  lieuNaissance?:string;
  noCNIB?:string;
  dateRecrutement?:Date;
  telephone?:string;
  email?:string;
  qualite?:string; //libelle qualite de l'agent.  ex: stagiaire, fonct. titulaire
  dateQualite?:Date;
  categorie?:string;
  echelle?:string;
  echellon?:string;
  position?:string; //la position administration de l'agent. ex: retraite, activite
  grade?:string;
  affectation?:string;
  corps?:Corps; //correspond a Emploi de l'agent
}

export interface GetAllAgentResponse {
  // totalCount: number;
   agents: Agent[];
 }


 export interface GetAgentResponse {
  // totalCount: number;
   agent: Agent;
 }
