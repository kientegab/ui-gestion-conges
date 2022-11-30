import { GetAllPrivilegeResponse, Privilege } from './privilege';
import { Profil,GetAllProfilResponse } from './profil';

export interface Compte {
  matricule?: string;
  dateNaissance?: Date;
  dateRecrutement? : Date;

}

export interface GetAllCompteResponse {
  // totalCount: number;
   comptes: Compte[];
}
