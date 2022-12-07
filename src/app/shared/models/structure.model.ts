import { Ministere } from './ministere.model';
import { TypeStructure } from './typeStructure.model';

export interface Structure {
  id?:number;
  sigle?:string;
  libelle?: string;
  description?: string;
  responsable?:string;
  type?:string;
  active?:boolean;
  telephone?:number;
  emailResp?:string;
  emailStruct?:string;
  parent?:Structure;
  ministere?: Ministere;
  adresse?: string;
}

export interface GetAllStructureResponse {
  structures: Structure[];
}

export enum StructureStatut{
   ACTIF="ACTIF",
   DEACTIVE="DESACTIVE"

}
