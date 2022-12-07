import { Structure } from "./structure.model";

export interface CompteSave {
  matricule?: string;
  email?: string;
  matriculeResp?: string;
  password?: string;
  structure? : Structure;
}

export interface GetAllCompteSaveResponse {
  // totalCount: number;
   compteSaves: CompteSave[];
}
