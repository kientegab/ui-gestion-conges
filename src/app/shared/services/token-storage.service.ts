import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_ENTR = 'auth-entreprise';
const USER_DIR = 'auth-direction';

const EXPIRES_AT = 'expires_at'; 

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private authenticationService: AuthenticationService) { }

  signOut(): void {
    window.sessionStorage.clear();
    window.localStorage.clear();
    //this.authenticationService.clearStorage();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveCompte(compte: any, entreprise:any, direction:any, expiration: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(compte));

    window.sessionStorage.removeItem(USER_ENTR);
    window.sessionStorage.setItem(USER_ENTR, JSON.stringify(entreprise));

    window.sessionStorage.removeItem(USER_DIR);
    window.sessionStorage.setItem(USER_DIR, JSON.stringify(direction));

    window.sessionStorage.removeItem(EXPIRES_AT);
    window.sessionStorage.setItem(EXPIRES_AT, expiration);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }


  public getCompte(): any {
    const compte = window.sessionStorage.getItem(USER_KEY);
    if (compte) {
      return JSON.parse(compte);
    }

    return {};
  }


  public getEntreprise(): any {
    const entreprise = window.sessionStorage.getItem(USER_ENTR);
    if (entreprise) {
      return JSON.parse(entreprise);
    }

    return {};
  }

  public getDirection(): any {
    const direction = window.sessionStorage.getItem(USER_DIR);
    if (direction) {
      return JSON.parse(direction);
    }

    return {};
  }

  isTokenExpired(): boolean {
    let expiration = this.getExpiration();  
    if (expiration) {
      return !(Date.now() < expiration);
    } 
    return false;
  }

  private getExpiration(): number {
    let expiresAt: number = 0;
    const expiration = localStorage.getItem(EXPIRES_AT);
      if (expiration) {
          expiresAt = JSON.parse(expiration);
      }
      return expiresAt;
  }

  isLoggedIn(): boolean {
    let loggedIn: boolean = false;

    if (this.getToken()) {
      loggedIn = !this.isTokenExpired();
    }
    return loggedIn;
  }
    
}
