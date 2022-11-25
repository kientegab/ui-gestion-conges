export interface Article {
    id?:number;
    code?:string;
    attributLibelle?: string;
    
  }
  
  export interface GetAllArticleResponse {
     articles: Article[];
   }
  