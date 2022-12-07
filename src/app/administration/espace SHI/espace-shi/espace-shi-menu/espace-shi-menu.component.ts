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
    {
      label: 'Accueil',
      icon: 'pi pi-home',
      routerLink: ['/']
      //  icon:'pi pi-fw pi-power-off'
    },
    {
      label: 'Formuler une demande',
      icon: 'pi pi-folder-open',
      routerLink: ['/entreprise']
      //  icon:'pi pi-fw pi-power-off'
    },
    {
      label: 'Mes Attestations aux marchés plubics',
      icon: 'pi pi-folder-open',
      routerLink: ['/entreprise/mes-demandes']
      //  icon:'pi pi-fw pi-power-off'
    },
    {
      label: 'Mes attestations de declarations',
      icon: 'pi pi-folder-open',
      routerLink: ['/entreprise/mes-demandes-declarations']
      //  icon:'pi pi-fw pi-power-off'
    },
  ];

  //   this.items = [
  //     {
  //         label:'Accueil',
  //         icon: 'pi pi-home',
  //         routerLink: ['/']
  //       //  icon:'pi pi-fw pi-power-off'
  //     },
  //     {
  //       label:'Postuler',
  //       icon: 'pi pi-folder-open',
  //       routerLink: ['/entreprise/postuler']
  //     //  icon:'pi pi-fw pi-power-off'
  //   },
  //     {
  //       label:'Mes demandes',
  //       icon: 'pi pi-folder-open',
  //       routerLink: ['/entreprise/mes-demandes']
  //     //  icon:'pi pi-fw pi-power-off'
  //   },
  // //   {
  // //     label:'Mon profil',
  // //     icon: 'pi pi-folder-open',
  // //     routerLink: ['/entreprise/mon-profil']
  // //   //  icon:'pi pi-fw pi-power-off'
  // // },
   
  // ];
  }
}
