import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-espace-shi-menu',
  templateUrl: './espace-shi-menu.component.html',
  styleUrls: ['./espace-shi-menu.component.scss']
})
export class EspaceShiMenuComponent implements OnInit {

  items: MenuItem[]=[];
  sousItems: MenuItem[]=[];
  private profil: string="";
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  constructor(private tokenStorageService: TokenStorageService, private router: Router,
  ) { }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/']);
    // window.location.reload();
  }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.profil = user.profil;

      this.username = user.username;

      
    }
  
  
    this.sousItems = [
      {label: 'Mes Informations', icon: 'pi-id-card', routerLink: ['/entreprise/mes-informations']},
      {separator: true},
      {label: 'Change Password', icon: 'pi-user-edit', routerLink: ['/entreprise/modifier-mot-de-passe']}
  ];


  this.items = [
  
  ];
  }
}
