import { Article } from "./article.model";
import { TypeDemande } from "./typeDemande.model";

export interface ArticleTypeDemande {
  article? : Article;
  typeDemande? : TypeDemande;
}

export interface GetAllArticleTypeDemandeResponse {
  articleTypeDemandes: ArticleTypeDemande[];
 }
