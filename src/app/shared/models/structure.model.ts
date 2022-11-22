import { Ministere } from './ministere.model';
import { TypeStructure } from './typeStructure.model';

export interface Structure {
  id?:number;
  sigle?:string;
  libelle?: string;
  description?: string;
  responsable?:string;
  active?:boolean;
  tel?:number;
  email?:string;
  adresse?: string;
  typeStructure?:TypeStructure;
  parent?:Structure;
  ministere?: Ministere;
}

export interface GetAllStructureResponse {
  structures: Structure[];
}

export enum StructureStatut{
   ACTIF="ACTIF",
   DEACTIVE="DESACTIVE"

}
