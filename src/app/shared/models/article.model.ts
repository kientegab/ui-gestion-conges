export interface Article {
    id?:number;
    code?:string;
    libelle?: string;
    
  }
  
  export interface GetAllArticleResponse {
     articles: Article[];
   }
  